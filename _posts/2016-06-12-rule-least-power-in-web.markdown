---
layout: post
title:  "Rule of Least Power in web development"
date:   2016-06-12 23:26:17
categories: frontend
description: "What should we understand from the rule of least power in day to day web development?"
---
From wikipedia, the rule of least power is a design principle that "suggests choosing the least powerful [computer] language suitable for a given purpose". Stated alternatively, given a choice among computer languages, classes of which range from descriptive (or declarative) to procedural, the less procedural, more descriptive the language one chooses, the more one can do with the data stored in that language. 

The principle was first formulated by Tim Berners-Lee, one of the founders of the web: https://www.w3.org/DesignIssues/Principles.html#PLP.

When you apply this rule in day to day programming it means that you should favour the simplest tool to get things done, i.e: using configuration or declarative languages like css/html instead of imperative ones.  

If it can be done via configuration in your system then change the settings in configuration without touching the code.

If an animation or a background effect can be done in css instead of javascript, then it should be done via css.

If you can create elements in html, create them in html not in php or javascript.

In magento, if you can insert an attribute via xml instead of calling it with php, then you should chose the xml route.

The main idea is that you should use the least powerful tool because with power comes complexity, possible errors, security issues etc. If you use a non-powerful tool, then your errors are least likely to make errors or to destroy the system.

Every web framework makes your life easier by using powerful imperative languages to do complex task that you just declare. Magento makes certain tasks very declarative, like changing themes, or customizing a theme. Often you only have to work in xml files. Angular and React do the same thing. 
