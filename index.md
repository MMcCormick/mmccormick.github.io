---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
list_title: Recent Posts
---
## Past Work
<!-- Loop through projects in resume as links (name and url fields) -->
{% for project in site.data.resume.projects %}
<!-- Only display as link if there's a URL -->
{% if project.url %}
<!-- - [{{ project.name }}]({{ project.url }}) -->
<!-- make the links target _blank -->
<h3><a target="_blank" href="{{ project.url }}">{{ project.name }}</a></h3>
{% else %}
<h3>{{ project.name }}</h3>
{% endif %}
{% endfor %}