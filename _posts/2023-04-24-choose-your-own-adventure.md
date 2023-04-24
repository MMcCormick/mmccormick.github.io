---
layout: post
title: "Choose Your Own Adventure: AI-Powered Interactive Storytelling"
date: 2023-04-23 10:30:00 -0400
categories: AI passion-project interactive-storytelling
---

I've always been fascinated by the intersection of AI, game design, and storytelling. This passion led me to create an AI-powered interactive storytelling engine. The engine uses advanced natural language processing and machine learning techniques to generate engaging and dynamic stories based on user input.

<!-- ![Sample Screenshot](/assets/images/sample-screenshot.png) -->

The core of the project is a game loop that takes in player input, interprets it, and generates a response, driving the narrative forward. Here's a simplified version of the game loop:

```python
while True:
    player_input = input("Input: ")
    history['player_inputs'].append(player_input)

    input_and_context = player_input
    required_action, referenced_fiction = embeddings.interpret(input_and_context, save_folder, training_mode=action_training_mode)

    for entity in referenced_fiction:
        key = next(iter(entity))
        fiction.add_referenced_key(key)

    narration_instruction = ''
    dice_player_display = ''

    # Decide response
    if required_action != None and required_action in skills.keys():
        # ... (skill responses)
    else:
        # ... (descriptive response)

    # Request resulting narration
    context = game_context(fiction, history, player_input)
    messages = narration_messages(fiction, history, narration_instruction)
    narration_response = request(messages, narration_settings)
    narration = process_narration(narration_response, history)

    print(dice_player_display + "\n")
    print(narration)

    if narrative.get_step_name() == "Ending" or character.death_counter > 3:
        print("~The End~")
        break
```
