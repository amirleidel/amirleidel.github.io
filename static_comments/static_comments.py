# -*- coding: utf-8 -*-

import codecs
import logging
import markdown
import os

logger = logging.getLogger(__name__)

from pelican import signals
import pelican.generators as generators
import pelican.readers as readers


def initialized(pelican):
    from pelican.settings import DEFAULT_CONFIG
    
    DEFAULT_CONFIG.setdefault('STATIC_COMMENTS', False)
    DEFAULT_CONFIG.setdefault('STATIC_COMMENTS_DIR' 'comments')
    if pelican:
        pelican.settings.setdefault('STATIC_COMMENTS', False)
        pelican.settings.setdefault('STATIC_COMMENTS_DIR', 'comments')
    
    
    fname = "content/announcements/first-announcement.md"

    #if not os.path.exists(fname):
    #    return
    
    input_file = codecs.open(fname, mode="r", encoding="utf-8")
    text = input_file.read()
    
    html = markdown.markdown(text)
    
    pelican.settings.setdefault('ANNOUNCEMENTS', html)
    #DEFAULT_CONFIG.setdefault('ANNOUNCEMENTS', html)

        

def register():
    signals.initialized.connect(initialized)
    #signals.page_generator_context.connect(add_static_comments)
