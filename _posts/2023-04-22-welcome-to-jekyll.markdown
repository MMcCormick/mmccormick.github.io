---
layout: post
title:  "An Introduction"
date:   2023-04-22 23:08:00 -0400
categories: introduction AI web-development
---

My name is Matt McCormick, and I am an AI and Full-stack Web Developer with a passion for innovation, creativity, and technology. Throughout my career, I have gained extensive experience in AI, web development, and consulting, specializing in providing comprehensive solutions and leveraging my expertise to drive success in the tech industry.

### Core Skills

{% for skill in site.data.resume.core_skills %}
- {{ skill }}
{% endfor %}

### Experience

{% for job in site.data.resume.experience %}
#### {{ job.position }}
**{{ job.company }}, {{ job.location }}**  
{{ job.start_date }} - {{ job.end_date }}
{% endfor %}

I am a creative, pioneering individual with a track record of success in various positions such as Senior Back-End Software Engineer, Full Stack Web Consultant, and CTO. My education includes a B.A. Degree in Computer Science & Music from Tufts, and I have over 15 years of web development experience.

In addition to my professional accomplishments, I am passionate about improvisation, interactive storytelling, procedural generation, emergent narrative, game design, and performance.

This site is primarily a central hub for my web presence, and will also contain insights on AI, web development, and other related topics. Stay tuned for updates on my latest projects. Thank you for joining me on this journey, and I look forward to sharing my knowledge and expertise with you!

For any inquiries, please feel free to reach out through the contact form on my website.

```python
import os
import openai
import datetime

openai.api_key = os.getenv("OPENAI_API_KEY")

def request(messages, settings):
    response = get_chat_response(messages, settings)
    log_response(messages, response)
    return response

def get_chat_response(messages, settings):
    response = openai.ChatCompletion.create(
        model=settings.get('model', 'gpt-3.5-turbo'),
        messages=messages,
        temperature=settings.get('temperature', 0.1),
        max_tokens=settings.get('max_tokens', 200),
        top_p=settings.get('top_p', 1),
        frequency_penalty=settings.get('frequency_penalty', 0),
        presence_penalty=settings.get('presence_penalty', 0),
        stop=settings.get('stop', ["\"\"\""])
    )
    return response['choices'][0]['message']['content']

def log_response(messages, response):
    log_file = "logs/api.log"
    os.makedirs(os.path.dirname(log_file), exist_ok=True)

    with open(log_file, "a") as f:
        f.write("\n\n" + datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S") + "\n")
        for message in messages:
            role, content = list(message.items())[0]
            f.write(f"{role.capitalize()}: {content}\n")
        f.write("Response: " + response + "\n")

```

```You find yourself in a dimly lit spaceport bar, surrounded by the rough and tumble patrons of The Rusty Star. As you sit at the bar, nursing a drink and keeping an eye out for any potential leads on your mission, you can't help but feel like you don't quite belong here. Your sleek cybernetic enhancements and tailored suit stand out amongst the grime and grit of the other patrons.```