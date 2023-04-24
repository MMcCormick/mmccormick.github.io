---
layout: post
title:  "An Introduction"
date:   2023-04-22 23:08:00 -0400
categories: introduction AI web-development
---

My name is Matt McCormick, and I am an AI and Full-stack Web Developer with a passion for innovation, creativity, and technology. Throughout my career, I have gained extensive experience in AI, industry-standard web technologies, and consulting, specializing in providing comprehensive solutions and leveraging my expertise to drive success in the tech industry.

Here's a sample of a single-shot interpreter I wrote recently which can affordably compare arbitrary text strings, allowing for semantic-meaning-based search and estimated required action:

```python
def similarity(v1, v2):
  # based upon https://stackoverflow.com/questions/18424228/cosine-similarity-between-2-number-lists
  return numpy.dot(v1, v2)/(numpy.linalg.norm(v1)*numpy.linalg.norm(v2))  # return cosine similarity

def get_embedding(content, engine='text-embedding-ada-002'):
  content = content.encode(encoding='ASCII',errors='ignore').decode()
  response = openai.Embedding.create(input=content,engine=engine)
  vector = response['data'][0]['embedding']  # this is a normal list
  return vector

# Return the required action and relevant entities
def interpret(input_and_context, save_path=None, training_mode=False):
  vector = get_embedding(input_and_context)
  required_action = estimate_required_action(vector)
  relevant_entities = get_relevant_entities(vector, save_path)
  if training_mode == True:
    required_action = optionally_correct(required_action)
    optionally_save_example(input_and_context, vector, required_action)
  return required_action, relevant_entities

def estimate_required_action(vector):
  all_examples = load_all_json('examples')
  # Organize the examples by required action
  organized_examples = {}
  for example in all_examples:
    required_action = example['required_action']
    organized_examples.setdefault(required_action, []).append(example)
  selected_action = None
  selected_similarity = 0
  # Compare the passed vector with the mean vector of each required action
  for action, examples in organized_examples.items():
    mean = numpy.mean([d['vector'] for d in examples], axis=0)
    action_similarity = similarity(vector, mean)
    logging.debug(action + str(action_similarity))
    if action_similarity > selected_similarity:
      selected_similarity = action_similarity
      selected_action = action
  return selected_action
```

I am a creative, pioneering individual with a track record of success in various positions such as Senior Back-End Software Engineer, Full Stack Web Consultant, and CTO. My education includes a B.A. Degree in Computer Science & Music from [Tufts](https://www.tufts.edu/), and I have over 15 years of web development experience. For more details on my experience, please head to [about](/about)

In addition to my professional accomplishments, I am passionate about improvisation, interactive storytelling, procedural generation, emergent narrative, game design, and performance.

This site is a central hub for my web presence, and will also contain insights on AI, web development, and other related topics. Stay tuned for updates on my latest projects. Thank you for joining me on this journey, and I look forward to sharing my knowledge and expertise with you!

For any inquiries, please feel free to reach out through the [contact page](/contact) on my website. You can also find me on [LinkedIn](https://www.linkedin.com/in/your-linkedin-profile), [GitHub](https://github.com/your-github-username), and [Twitter](https://twitter.com/your-twitter-handle).
