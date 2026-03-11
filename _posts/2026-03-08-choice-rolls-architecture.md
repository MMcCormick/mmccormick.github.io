---
layout: post
title: "How I Built a Game Where Your Past Choices Change How the Dice Roll"
date: 2026-03-08 10:00:00 -0400
categories: [AI, game-design, interactive-storytelling, architecture]
permalink: /posts/2026/03/08/choice-rolls-architecture/
---

Most AI storytelling tools work like a fancy autocomplete: you type something, the model writes the next paragraph. There's no memory of what came before beyond a context window, no mechanical weight to your decisions, no sense that the world actually changes based on what you've done.

I wanted something different. I wanted past choices to *matter* — not just narratively, but mechanically. A bad outcome early in the game should make certain future actions harder. A clever solution should open doors later. I wanted the world to remember you.

This is the story of how I built that, and what I learned.

---

## The Core Problem: Making the Past Feel Permanent

Traditional RPGs solve this with explicit flags. You flipped the lever in the dungeon? `lever_flipped = true`. The drawbridge is now open. It works, but it requires a designer to anticipate every meaningful choice and hardcode its consequences.

With an AI-driven narrative, you can't do that. Players say unpredictable things. The world is generated dynamically. You have no idea in advance what choices will matter.

So I needed a way to store consequences that didn't require anticipating them — and a way to apply them later without knowing exactly when or how they'd be relevant.

The answer was embeddings.

---

## Consequences as Embeddings

When a player resolves a significant challenge in Choice Rolls, the game generates a consequence. It looks something like this:

```python
class Consequence:
    long_term_impact: str        # "The guards are now on high alert in the market district"
    future_trigger_situations: str  # "When the player attempts anything covert in the market"
    impact_modifier: int         # -1 (makes future rolls harder)
```

The `future_trigger_situations` field is the key part. Instead of a hardcoded condition like `if location == "market"`, it's a plain English description of the kinds of situations where this consequence should apply.

When that consequence is created, I embed `future_trigger_situations` using OpenAI's text-embedding-ada-002 and store it alongside the consequence data:

```python
vector = get_embedding(consequence.future_trigger_situations)
save_json(save_folder + '/consequences/', {
    "message": consequence.future_trigger_situations,
    "data": consequence.__dict__,
    "vector": vector
})
```

Later, on every player action, I embed the current game context — the player's location, what they're attempting, the state of the world — and search it against the stored consequence embeddings using cosine similarity:

```python
def find_similar_content(context_vector, max_results=3):
    matches = []
    for stored in load_all_consequence_embeddings():
        score = cosine_similarity(context_vector, stored['vector'])
        if score > CONSEQUENCE_THRESHOLD:  # 0.7
            matches.append((score, stored['data']))
    return sorted(matches, reverse=True)[:max_results]
```

If the similarity exceeds the threshold, the consequence is applied — its `impact_modifier` adjusts the dice pool for that action. The market guard alert doesn't fire when you're climbing a mountain. It fires when you're trying to sneak past a checkpoint. The model figures out the relevance; I just compare vectors.

This means the game can accumulate a history of consequences that interact with future events in ways neither I nor the player anticipated. The world remembers, and the memory has mechanical weight.

---

## Two Embedding Systems, Two Different Jobs

As I built this out, I realized I needed two distinct embedding systems with different purposes:

**Static embedder** — a fixed repository of labeled examples used to interpret player intent. When a player types "I try to talk my way past the guard," the system embeds that input and searches it against pre-labeled examples to determine which skill it maps to (in this case, probably Diplomacy). This repository doesn't change during a game. It's the interpreter.

**Dynamic embedder** — the per-game consequence store described above. This grows over the course of play as consequences accumulate. It's the memory.

Separating these was important. If I'd used a single system, I'd either be constantly re-embedding static training data (wasteful) or mixing interpretation logic with world state (confusing). Keeping them separate meant each could be optimized for its job.

---

## "Fiction First": Designing the GM's Decision-Making

The other problem I had to solve was dice roll frequency. Early versions of the game called for a dice roll on almost every player action. This killed narrative flow — it felt like filling out paperwork rather than living in a story.

The fix was partly prompt engineering, partly structural. I gave the GM model a set of tools it could call — `call_for_roll`, `resolve_without_roll`, `introduce_element`, `update_fiction`, and others — and used `tool_choice="required"` to force a structured decision every turn. The system prompt makes the philosophy explicit:

> *Fiction first: only call for a roll when the outcome is genuinely uncertain AND failure matters to the story. Trivial actions, obvious outcomes, and moments that would feel better as pure narration should resolve without mechanics.*

This isn't an original idea; it's lifted directly from the design philosophy of tabletop RPGs like D&D and Blades in the Dark, which both hold that dice rolls should only happen when the outcome is uncertain and the stakes are real. I just had to find a way to encode that philosophy structurally so an LLM would actually follow it. The model gets clear instruction on what constitutes "roll-worthy".

---

## Multi-Turn Challenges: The Situation Mechanic

Single rolls work for quick moments of tension. But some challenges should unfold over multiple exchanges — a chase, a negotiation, a complicated heist. For these, I built the Situation mechanic.

A Situation is created when the GM decides a challenge warrants extended resolution. It tracks progress toward success or failure across up to three player actions:

```python
class Situation:
    difficulty: int        # Progress needed to succeed
    risk: int              # How bad failure is
    progress: int          # Current progress (starts at 0)
    action_counter: int    # Number of actions taken (max 3)

    def resolve_action(dice_result):
        if dice_result > 3:
            progress += 1   # Moving forward
        elif dice_result < 3:
            progress -= 1   # Setback

        if progress >= difficulty:   return "success"
        if progress <= -risk:        return "failure"
        if action_counter >= 3:      return "mixed"
        return "ongoing"
```

When the Situation resolves — success, failure, or the messy middle — it generates a consequence and embeds it. That consequence then becomes part of the game's living memory, potentially affecting future rolls through the semantic matching system described above.

The loop closes: multi-turn challenges produce consequences, consequences alter future challenges, and the whole thing accumulates meaning over the course of a session.

---

## What I'd Do Differently

The architecture works, but it has rough edges I'd clean up if I rebuilt it today.

**The consequence threshold is fragile.** A fixed similarity score of 0.7 is too blunt. Consequences fire too eagerly in some situations and not at all in others. A better approach would be to ask the model to judge relevance given the consequence description and the current context — slower, but more accurate.

**The skill system is too flat.** Skills start at 0-2 and don't currently improve. A progression system would make the consequence mechanic feel more meaningful — succeeding in a skill-based challenge and getting better at it over time would close another loop.

---

## The Bigger Idea

What I was really trying to build was a system where emergent narrative and mechanical consequence could reinforce each other — where the story you tell leaves marks on the world, and those marks have real effects on future outcomes.

Embeddings turned out to be the right primitive for this. They let me store intent without anticipating specific triggers, match context without writing explicit conditions, and build a memory system that scales naturally as the game generates more history.

The interesting design space here isn't "AI that writes good prose." It's "AI that maintains a coherent, reactive world." Those are different problems, and the second one is harder and more interesting.

If any of this sounds interesting, you're welcome to try it at [choicerolls.com](https://choicerolls.com) - no account needed.
