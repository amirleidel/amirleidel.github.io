AUTHOR = 'Amir J. G. Leidel'
SITENAME = 'amirs-blog'
SITEURL = ""

from datetime import datetime
from pelican.plugins import render_math
PLUGINS = [render_math]
MATH_JAX = {"tex_extensions" : ["physics.js"],
            "linebreak_automatic" : True,
	    "message_style" : None,
	    "latex_preview" : "Tex"}

DISPLAY_PAGES_ON_MENU = True
LOAD_CONTENT_CACHE = False
PATH = "content"
THEME = "theme"

TIMEZONE = 'Europe/Rome'
CURRENT_YEAR = datetime.today().strftime('%Y')

DEFAULT_LANG = 'en'

# Additional menu item
MENUITEMS = (
    ('GitHub', 'https://github.com/amirleidel'),)
DISPLAY_FOOTER = True

SITELOGO = ''

STATIC_PATHS = [
    'images',
    'extra',  
]
EXTRA_PATH_METADATA = {
    'extra/favicon.ico': {'path': 'favicon.ico'}, 
    'extra/favicon.png': {'path': 'favicon.png'}, 
}

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

SUMMARY_MAX_PARAGRAPHS = 4
SUMMARY_MAX_LENGTH = 200
SUMMARY_END_SUFFIX = '…'
WITH_FUTURE_DATES = False

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
# RELATIVE_URLS = True

TYPOGRIFY = True
TYPOGRIFY_DASHES = "oldschool"
'''
SEO_REPORT = True  # SEO report is enabled by default
SEO_ENHANCER = False  # SEO enhancer is disabled by default
SEO_ENHANCER_OPEN_GRAPH = False # Subfeature of SEO enhancer
SEO_ENHANCER_TWITTER_CARDS = False # Subfeature of SEO enhancer
'''
