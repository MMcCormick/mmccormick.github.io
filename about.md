---
layout: page
title: About
permalink: /about/
---

## About Matt McCormick

Matt McCormick is a full stack web developer with a passion for AI technology, and well over a decade of experience creating production grade software. If you need a complex web application for your MVP, he's made many of those. Matt has also worked on at-scale applications passing millions of messages per day. He's passionate about the intersection of large language models and storytelling.

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

Matt has been the person companies lean on for the hard technical calls. As Acting CTO at One Click Politics he became the primary technical contact and restored the board's confidence in engineering, while leading hiring and managing the back-end team. Before that he kept a 200,000-requests-a-day messaging system running and shipped its major features. As CTO at Swink.tv he rebuilt the product from the ground up, and he was the technical co-founder of Spruceling. Scroll down for the full history.

### Education

Matt holds a B.A. in Computer Science & Music from Tufts University.

### Interests

Outside work, Matt is into interactive storytelling, improvisation, procedural generation, emergent narrative, and game design.

### Connect with Matt

Get in touch with Matt through [email](mailto:info@mattcmccormick.com) or connect with him on [Twitter](https://twitter.com/MattCMcCormick) and [GitHub](https://github.com/MMcCormick).

If you're interested in collaborating or want to learn more about Matt's work, feel free to reach out through the [contact form](/contact) on his website.

### Experience

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