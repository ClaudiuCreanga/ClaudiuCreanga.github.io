---
layout: post
title:  "Average age of top 100 ATP male tennis players"
date:   2017-05-23 23:26:17
categories: data-science
description: "Although the sport is getting more physical we can see that the age of top tennis players has gone up"
---

<div class='jupyter'>

{% highlight python linenos %}
import pandas as pd
import glob
import matplotlib.pyplot as plt
import datetime, sys
import numpy as np

%matplotlib inline
{% endhighlight %}


{% highlight python linenos %}
def parse(t):
    string_ = str(t)
    try:
        return datetime.date(int(string_[:4]), int(string_[4:6]), int(string_[6:]))
    except:
        return datetime.date(1900,1,1)
{% endhighlight %}


{% highlight python linenos %}
def readAllFiles():
    allFiles = glob.iglob("data/atp_rankings_" + "*.csv")
    ranks = pd.DataFrame()
    list_ = list()
    for filen in allFiles:
        df = pd.read_csv(filen,
                         index_col=None,
                         header=None,
                         parse_dates=[0],
                         date_parser=lambda t:parse(t))
        list_.append(df)
    ranks = pd.concat(list_)
    return ranks
{% endhighlight %}


{% highlight python linenos %}
def readPlayers():
    return pd.read_csv("data/atp_players.csv",
                       index_col=None,
                       header=None,
                       parse_dates=[4],
                       date_parser=lambda t:parse(t))
{% endhighlight %}


{% highlight python linenos %}
ranks = readAllFiles()
ranks = ranks[(ranks[1]<100)]
ranks = ranks.apply(lambda row: pd.Series({'ranking_date':row[0], 'ranking':row[1], 'player_id':int(row[2]), 'ranking_points':row[3]}), axis=1)
players = readPlayers()
plRanks = ranks.merge(players,right_on=0,left_on="feature3")
plRanks["B"] = plRanks["feature1"] - plRanks[4]
plRanks["B"] = plRanks["B"].astype(int) / (365*24*3600*1000000000.0)
agg = plRanks[["feature1","B"]].groupby("feature1")
data = agg.mean()
{% endhighlight %}


{% highlight python linenos %}
plt.plot(data.index.to_pydatetime(), data.B)
{% endhighlight %}

<img src="../assets/ipynb/tennis/tennis_5_1.png" />

Full code: https://github.com/ClaudiuCreanga/tennis-statistics

