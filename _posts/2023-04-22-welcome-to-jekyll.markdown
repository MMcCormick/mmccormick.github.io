---
layout: post
title:  "Welcome to Matt McCormick's Professional Blog!"
date:   2023-04-22 23:08:00 -0400
categories: introduction AI web-development
---
My name is Matt McCormick, and I am an AI and Full-stack Web Developer with a passion for innovation, creativity, and technology. Throughout my career, I have gained extensive experience in AI, web development, and consulting, specializing in providing comprehensive solutions and leveraging my expertise to drive success in the tech industry.

My core skills include:
{% for skill in site.data.resume.core_skills %}
  <li>{{ skill }}</li>
{% endfor %}

Experience:
{% for job in site.data.resume.experience %}
  <h3>{{ job.position }}</h3>
  <p>{{ job.company }}, {{ job.location }}</p>
  <p>{{ job.start_date }} - {{ job.end_date }}</p>
{% endfor %}


I am a creative, pioneering individual with a track record of success in various positions such as Senior Back-End Software Engineer, Full Stack Web Consultant, and CTO. My education includes a B.A. Degree in Computer Science & Music from, and I have over 15 years of web development experience.

In addition to my professional accomplishments, I am passionate about improvisation, interactive storytelling, procedural generation, emergent narrative, game design, and performance.

This site is primarily a central hub for my web presence, and will also contain insights on AI, web development, and other related topics. Stay tuned for updates on my latest projects. Thank you for joining me on this journey, and I look forward to sharing my knowledge and expertise with you!

For any inquiries, please feel free to reach out through the contact form on my website.

{% highlight python %}
class Fiction:
	def __init__(self, save_folder='saves/dummy_save'):
		self.save_folder = save_folder
		self.character = {'name': '', 'description': '', 'status': 'alive'}
		self.protagonist = self.character.copy()
		self.protagonist.update({'current_location': '', 'current_activity': '', })
		self.blank_fiction = {
			'genre': '',
			'tone': '',
{% endhighlight %}

{% highlight code %}
You find yourself in a dimly lit spaceport bar, surrounded by the rough and tumble patrons of The Rusty Star. As you sit at the bar, nursing a drink and keeping an eye out for any potential leads on your mission, you can't help but feel like you don't quite belong here. Your sleek cybernetic enhancements and tailored suit stand out amongst the grime and grit of the other patrons.
{% endhighlight %}
