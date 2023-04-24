---
layout: page
title: About
permalink: /about/
---

## About Matt McCormick

Matt McCormick is a highly skilled AI and full-stack web developer with over 15 years of experience in the industry. Specializing in Python, OpenAI, and startup development, Matt has been the driving force behind numerous innovative projects that showcase his expertise in AI solutions and web development.

### Core Skills
<p>
  <div style="display: flex; flex-wrap: wrap;">
  {% for skill in site.data.resume.core_skills %}
    <div style="flex: 1 1 33%; padding: 2px;">
      - {{ skill }}
    </div>
  {% endfor %}
  </div>
</p>

### Experience

Throughout his career, Matt has held various positions such as Senior Back-End Software Engineer, Full Stack Web Consultant, and CTO. His experience spans across different industries, and he has been instrumental in providing comprehensive solutions to numerous clients.

{% for exp in site.data.resume.experience %}
#### {{ exp.position }} at {{ exp.company }}
{{ exp.location }} | {{ exp.start_date }} - {{ exp.end_date }}
{% if exp.description %}
<p>
  <details>
    <summary>Description</summary>
    <ul>
    {% for desc in exp.description %}
        <li>{{ desc }}</li>
    {% endfor %}
    </ul>
  </details>
</p>
{% endif %}
{% endfor %}

### Education

Matt holds a B.A. Degree in Computer Science & Music from Tufts University, where he honed his skills in programming, problem-solving, and creativity.

### Interests

Outside of his professional accomplishments, Matt is passionate about improvisation, interactive storytelling, procedural generation, emergent narrative, game design, and performance. He is constantly exploring new ways to combine technology and creativity to push the boundaries of innovation.

### Connect with Matt

Get in touch with Matt through [email](mailto:info@mattcmccormick.com) or connect with him on [Twitter](https://twitter.com/MattCMcCormick) and [GitHub](https://github.com/MMcCormick).

If you're interested in collaborating or want to learn more about Matt's work, feel free to reach out through the [contact form](/contact) on his website.

