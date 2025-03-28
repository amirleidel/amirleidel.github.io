Title: Meta, or how I created this website
Date: 2025-03-28 15:00
Category: Meta
Authors: Amir
Slug: meta
Summary: Talking about the technologies of this website and how I created my own Blog!

# Ramblings and Technologies and how I created my own Blog!

## My Considerations for this Website

<details>

This blog was actually started in September of 2021. Back then already, I wanted a place where I can post my own projects and thoughts outside of social media. The reason for that being that I think all major services that offer you creating own little account and making posts being too restrictive. Many of my thoughts use mathematical notation, so one of the things Id definetely like to be able to do is typing in LaTeX. Platforms like Xitter or Reddit dont support that at all. Therefore the people on there make do by posting the equations either as images (which is stupid) or typing them out in Unicode. Reddit does even support simple formatting for superscripts and subscripts, so there is that. But in the end, typing math using Unicode only is still far too restrictive, tedious and can make expressions unnecessarily long.

Next off, I think that pure calculations are very boring and useless if there is no way to properly illustrate them, be it with diagrams and graphs or rendering images. If you can demonstrate something, then you should probably just do exactly that. So, Id like to be able to insert images whereever in-between the text of posts. Also, a common format for vector diagrams, which scale as you zomm in, is SVG. So the page should support the use of that (reddit does not btw). 

Further features that I wanted were being able to insert verbatim text with code highlighting. This is great if you want to display a program or just a section of it, with highlighting just as inside a code editor, making it far more readable. Also, the ability to insert links to your sources and further reading is very powerful.

Honestly, I could just go on and on, the conclusion is the same, if you want to be able to do stuff your own way, just make your own website! 

</details>

## How I wanted my Solution

<details>
However, making my own website confronted me with some problems that I wanted to minimize in their impact. First being that I didnt have much experience in HTML and CSS. They are not hard to learn, lets admit that, but I wanted to keep the focus first and foremost on creating posts. If I fall in love with HTML and CSS during that process, thats a nice bonus! There should be minimal time for setup and everything should work 'out of the box'. Which means, that I wanted to be able to start with a barebones experience, that nonetheless be able to support any kind of features I want to add.

Luckily, there are website generators. So what you can do with these, is, that you can write posts with text and images and all in an easily readable format like markdown. After that, the website generator takes these files and generates HTML files with their CSS that you can serve on your own website.

And regarding the site itself, if it can start as a barebones experience, it just doesnt need much interactivity and in turn it should not rely on any server-side scripting or logic at all. Such a website is called a static webpage and it gets send to your client exactly as you have prepared it. However, the adjective static is not even fully correct here, since even static webpages can have interactive elements via JavaScript, that are run on your clients side. So, static websites are more capable than their name suggests! 

</details>

## Technologies I settled on (for now)

*Now were finally coming to the part where a human solves a problem using technology that they wouldnt have without technology.*

These are the current solutions I use for this website, since mid-2024.

The pages are all generated using [Pelican](https://getpelican.com/), which is a static website generator written in Python. I decided on it because:

- It can process markdown files to HTML
- Has a nice ecosystem of plugins (thats important for LaTeX!)
- Code syntax highlighting
- Comes with a simple server to debug and test locally
- A lot of community-built themes
- Its written in Python 

And if you need those, it also supports, among other things:

- Automated RSS feed generation 
- Publishing multiple versions of pages in different languages

These we not my focus, but still nice to have.

All of this, you can get within minutes. If you dont know Python, its super fun to learn, quite worth your while and you can get it for free at [python.org](https://www.python.org/downloads/). Especially if youre a beginner to programming, Python is a good choice with its human readable syntax and 'batteries included' approach. After that, Pelican is also nice to setup, take a look at [Quickstart](https://docs.getpelican.com/en/latest/quickstart.html#installation), it doesnt get any simpler than that!

Plugin for rendering math: [github.com/pelican-plugins/render-math](https://github.com/pelican-plugins/render-math). Pelican theme: [github.com/tcarwash/blue-penguin-dark](https://github.com/tcarwash/blue-penguin-dark) Maybe you can still see some remnants of the original theme on this website! Just modifying the themes HTML and CSS is quite easy. Just note that the former is not the actual HTML of your pages as you would expect, its actually just *templates* that are applied and that pelican processes using [Jinja](https://jinja.palletsprojects.com/en/stable/).

## Hosting 

Now, equipped with a generator and the files for a working website, there was still the open question on where I want to host the files. I decided (for now at least) to host everything on [GitHub Pages](https://pages.github.com/). This solution is quite nice, since it combines version control where Id be using git ([What is git?](https://www.w3schools.com/git/git_intro.asp?remote=github)) anyways and the hosting solution into one. An additional bonus is also that GitHub Pages will host your website for *free up until 1GB!*

After uploading the files to GitHub and setting up the repository as a GitHub Page, it still has to be deployed, for which I use a custom workflow that gets executed every time I push to the repository. More information about that you can find here: [Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

Consequently, all files for [ajgl.blog](https://ajgl.blog/) you can find on my repository [github.com/amirleidel/amirleidel.github.io](https://github.com/amirleidel/amirleidel.github.io). If you have some questions or have some ideas, please feel free to email me at [amir@ajgl.blog](mailto:amir@ajgl.blog).

GitHub Pages also allows you to host your website under your own domain: [Configuring a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
