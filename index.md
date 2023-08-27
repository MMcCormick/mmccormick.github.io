---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
list_title: Recent Posts
---
## Past Work
<!-- Loop through projects in resume as links (name and url fields) -->
{% for project in site.data.resume.projects %}
<h4 class="work-link">
<!-- Only display as link if there's a URL -->
{% if project.url %}
<!-- - [{{ project.name }}]({{ project.url }}) -->
<!-- make the links target _blank -->
<a target="_blank" href="{{ project.url }}">{{ project.name }}</a>
{% else %}
{{ project.name }}
{% endif %}
</h4>
{% endfor %}

##### See [About]({{ site.baseurl }}{% link about.md %}) for details on my contributions to each project.