---
layout: post
title:  "Kaggle Sberbank Hoursing Market Competition"
date:   2017-05-22 23:26:17
categories: data-science
description: "Kaggle Sberbank Housing Market Competition - Random Forest, Extreme Gradient Boosting, Linear Regression"
---

<div class='jupyter'>

{% highlight python linenos %}
# imports 

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
color = sns.color_palette()

%matplotlib inline
{% endhighlight %}
<br />

{% highlight python linenos %}
# load the data

X_train = pd.read_csv("data/russian_house_market/train.csv", parse_dates=['timestamp'])
X_test = pd.read_csv("data/russian_house_market/test.csv")
{% endhighlight %}
<br />

{% highlight python linenos %}
X_train.describe()
{% endhighlight %}
<br />

<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>id</th>
      <th>full_sq</th>
      <th>life_sq</th>
      <th>floor</th>
      <th>max_floor</th>
      <th>material</th>
      <th>build_year</th>
      <th>num_room</th>
      <th>kitch_sq</th>
      <th>state</th>
      <th>...</th>
      <th>cafe_count_5000_price_2500</th>
      <th>cafe_count_5000_price_4000</th>
      <th>cafe_count_5000_price_high</th>
      <th>big_church_count_5000</th>
      <th>church_count_5000</th>
      <th>mosque_count_5000</th>
      <th>leisure_count_5000</th>
      <th>sport_count_5000</th>
      <th>market_count_5000</th>
      <th>price_doc</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>30471.000000</td>
      <td>30471.000000</td>
      <td>24088.000000</td>
      <td>30304.000000</td>
      <td>20899.000000</td>
      <td>20899.000000</td>
      <td>1.686600e+04</td>
      <td>20899.000000</td>
      <td>20899.000000</td>
      <td>16912.000000</td>
      <td>...</td>
      <td>30471.000000</td>
      <td>30471.000000</td>
      <td>30471.000000</td>
      <td>30471.000000</td>
      <td>30471.000000</td>
      <td>30471.000000</td>
      <td>30471.000000</td>
      <td>30471.000000</td>
      <td>30471.000000</td>
      <td>3.047100e+04</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>15237.917397</td>
      <td>54.214269</td>
      <td>34.403271</td>
      <td>7.670803</td>
      <td>12.558974</td>
      <td>1.827121</td>
      <td>3.068057e+03</td>
      <td>1.909804</td>
      <td>6.399301</td>
      <td>2.107025</td>
      <td>...</td>
      <td>32.058318</td>
      <td>10.783860</td>
      <td>1.771783</td>
      <td>15.045552</td>
      <td>30.251518</td>
      <td>0.442421</td>
      <td>8.648814</td>
      <td>52.796593</td>
      <td>5.987070</td>
      <td>7.123035e+06</td>
    </tr>
    <tr>
      <th>std</th>
      <td>8796.501536</td>
      <td>38.031487</td>
      <td>52.285733</td>
      <td>5.319989</td>
      <td>6.756550</td>
      <td>1.481154</td>
      <td>1.543878e+05</td>
      <td>0.851805</td>
      <td>28.265979</td>
      <td>0.880148</td>
      <td>...</td>
      <td>73.465611</td>
      <td>28.385679</td>
      <td>5.418807</td>
      <td>29.118668</td>
      <td>47.347938</td>
      <td>0.609269</td>
      <td>20.580741</td>
      <td>46.292660</td>
      <td>4.889219</td>
      <td>4.780111e+06</td>
    </tr>
    <tr>
      <th>min</th>
      <td>1.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>1.000000</td>
      <td>0.000000e+00</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>1.000000</td>
      <td>...</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>1.000000e+05</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>7620.500000</td>
      <td>38.000000</td>
      <td>20.000000</td>
      <td>3.000000</td>
      <td>9.000000</td>
      <td>1.000000</td>
      <td>1.967000e+03</td>
      <td>1.000000</td>
      <td>1.000000</td>
      <td>1.000000</td>
      <td>...</td>
      <td>2.000000</td>
      <td>1.000000</td>
      <td>0.000000</td>
      <td>2.000000</td>
      <td>9.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>11.000000</td>
      <td>1.000000</td>
      <td>4.740002e+06</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>15238.000000</td>
      <td>49.000000</td>
      <td>30.000000</td>
      <td>6.500000</td>
      <td>12.000000</td>
      <td>1.000000</td>
      <td>1.979000e+03</td>
      <td>2.000000</td>
      <td>6.000000</td>
      <td>2.000000</td>
      <td>...</td>
      <td>8.000000</td>
      <td>2.000000</td>
      <td>0.000000</td>
      <td>7.000000</td>
      <td>16.000000</td>
      <td>0.000000</td>
      <td>2.000000</td>
      <td>48.000000</td>
      <td>5.000000</td>
      <td>6.274411e+06</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>22855.500000</td>
      <td>63.000000</td>
      <td>43.000000</td>
      <td>11.000000</td>
      <td>17.000000</td>
      <td>2.000000</td>
      <td>2.005000e+03</td>
      <td>2.000000</td>
      <td>9.000000</td>
      <td>3.000000</td>
      <td>...</td>
      <td>21.000000</td>
      <td>5.000000</td>
      <td>1.000000</td>
      <td>12.000000</td>
      <td>28.000000</td>
      <td>1.000000</td>
      <td>7.000000</td>
      <td>76.000000</td>
      <td>10.000000</td>
      <td>8.300000e+06</td>
    </tr>
    <tr>
      <th>max</th>
      <td>30473.000000</td>
      <td>5326.000000</td>
      <td>7478.000000</td>
      <td>77.000000</td>
      <td>117.000000</td>
      <td>6.000000</td>
      <td>2.005201e+07</td>
      <td>19.000000</td>
      <td>2014.000000</td>
      <td>33.000000</td>
      <td>...</td>
      <td>377.000000</td>
      <td>147.000000</td>
      <td>30.000000</td>
      <td>151.000000</td>
      <td>250.000000</td>
      <td>2.000000</td>
      <td>106.000000</td>
      <td>218.000000</td>
      <td>21.000000</td>
      <td>1.111111e+08</td>
    </tr>
  </tbody>
</table>
<p>8 rows × 276 columns</p>
</div>

{% highlight python linenos %}
# correlation with target feature

corr_matrix = X_train.corr()
corr_matrix["price_doc"].sort_values(ascending=False)
{% endhighlight %}
<br />


{% highlight python linenos %}

    price_doc                     1.000000
    num_room                      0.476337
    full_sq                       0.341840
    sport_count_5000              0.294864
    sport_count_3000              0.290651
    trc_count_5000                0.289371
    sport_count_2000              0.278056
    office_sqm_5000               0.269977
    trc_sqm_5000                  0.268072
    sport_count_1500              0.258376
    sport_objects_raion           0.252794
    trc_count_3000                0.242068
    cafe_count_5000_price_1000    0.240464
    cafe_count_5000_price_1500    0.232612
    cafe_count_5000               0.231546
    cafe_count_5000_na_price      0.230055
    cafe_count_5000_price_500     0.226952
    office_sqm_3000               0.226780
    cafe_count_5000_price_2500    0.225566
    trc_sqm_3000                  0.225533
    office_count_5000             0.219249
    office_sqm_2000               0.216495
    cafe_count_5000_price_high    0.214327
    church_count_5000             0.213275
    cafe_count_5000_price_4000    0.210354
    leisure_count_5000            0.200448
    big_church_count_5000         0.198827
    sport_count_1000              0.197994
    office_sqm_1500               0.195811
    market_count_5000             0.194021
                                    ...   
    area_m                       -0.166981
    public_healthcare_km         -0.173726
    market_shop_km               -0.174460
    shopping_centers_km          -0.178293
    metro_km_avto                -0.179412
    metro_km_walk                -0.182786
    metro_min_walk               -0.182786
    park_km                      -0.186584
    fitness_km                   -0.191120
    metro_min_avto               -0.192180
    radiation_km                 -0.192863
    big_church_km                -0.193540
    museum_km                    -0.196742
    exhibition_km                -0.207877
    workplaces_km                -0.209302
    thermal_power_plant_km       -0.210417
    catering_km                  -0.210793
    swim_pool_km                 -0.211798
    theater_km                   -0.216025
    university_km                -0.218552
    detention_facility_km        -0.223061
    office_km                    -0.223429
    basketball_km                -0.223462
    stadium_km                   -0.236924
    nuclear_reactor_km           -0.257946
    ttk_km                       -0.272620
    bulvar_ring_km               -0.279158
    kremlin_km                   -0.279249
    sadovoe_km                   -0.283622
    zd_vokzaly_avto_km           -0.284069
    Name: price_doc, Length: 276, dtype: float64
{% endhighlight %}




{% highlight python linenos %}
# correlations between most important features

attributes = ["num_room", "full_sq", "sport_count_5000", "sport_count_3000"]
pd.plotting.scatter_matrix(X_train[attributes], figsize=(12,8))
{% endhighlight %}
<br />


<img src="../assets/ipynb/sberbank/sberbank-russian-housing-market_5_1.png" />

{% highlight python linenos %}
# most interesting is the num_room, so let's plot it against the target feature
# as we can see 

X_train.plot(kind="scatter", x="num_room", y="price_doc", alpha=0.1)
{% endhighlight %}
<br />

<img src="../assets/ipynb/sberbank/sberbank-russian-housing-market_6_1.png" />


{% highlight python linenos %}
# missing data

train_na = (X_train.isnull().sum() / len(X_train)) * 100 # see the percentage
train_na = train_na.drop(train_na[train_na == 0].index).sort_values(ascending=False) # drop the ones that are zeros
{% endhighlight %}
<br />

{% highlight python linenos %}
# plot the missing data

f, ax = plt.subplots(figsize=(12, 8))
plt.xticks(rotation='90')
sns.barplot(x=train_na.index, y=train_na)
ax.set(title='Percent missing data by feature', ylabel='% missing')
{% endhighlight %}
<br />

<img src="../assets/ipynb/sberbank/sberbank-russian-housing-market_8_1.png" />

{% highlight python linenos %}

{% endhighlight %}
<br />

{% highlight python linenos %}
# fill the na and get dummy variables from categorical data

X_all = pd.concat(objs = [X_train, X_test], axis=0)
assert isinstance(X_all, pd.DataFrame)

X_all["timestamp"] = X_all["timestamp"].apply(lambda row: str(row).split("-")[0])
X_all.fillna(X_all.mean(), inplace = True)
X_all = pd.get_dummies(X_all)
{% endhighlight %}
<br />

{% highlight python linenos %}
# feature scaling

from sklearn_pandas import DataFrameMapper
from sklearn.preprocessing import StandardScaler

ids = X_all["id"]
mapper = DataFrameMapper([(X_all.columns, StandardScaler())])
scaled_features = mapper.fit_transform(X_all.copy())
scaled_features_df = pd.DataFrame(scaled_features, index=X_all.index, columns=X_all.columns)
scaled_features_df.head()
{% endhighlight %}
<br />



<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>0_13_all</th>
      <th>0_13_female</th>
      <th>0_13_male</th>
      <th>0_17_all</th>
      <th>0_17_female</th>
      <th>0_17_male</th>
      <th>0_6_all</th>
      <th>0_6_female</th>
      <th>0_6_male</th>
      <th>16_29_all</th>
      <th>...</th>
      <th>thermal_power_plant_raion_no</th>
      <th>thermal_power_plant_raion_yes</th>
      <th>timestamp_2011</th>
      <th>timestamp_2012</th>
      <th>timestamp_2013</th>
      <th>timestamp_2014</th>
      <th>timestamp_2015</th>
      <th>timestamp_2016</th>
      <th>water_1line_no</th>
      <th>water_1line_yes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1.201285</td>
      <td>1.162229</td>
      <td>1.235537</td>
      <td>1.188467</td>
      <td>1.149805</td>
      <td>1.222768</td>
      <td>1.153571</td>
      <td>1.164018</td>
      <td>1.141788</td>
      <td>-0.223144</td>
      <td>...</td>
      <td>0.23946</td>
      <td>-0.23946</td>
      <td>7.045668</td>
      <td>-0.381237</td>
      <td>-0.51436</td>
      <td>-0.74719</td>
      <td>-0.47077</td>
      <td>-0.341515</td>
      <td>0.286628</td>
      <td>-0.286628</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.523683</td>
      <td>0.554055</td>
      <td>0.494024</td>
      <td>0.548430</td>
      <td>0.565753</td>
      <td>0.531123</td>
      <td>0.445573</td>
      <td>0.478837</td>
      <td>0.413604</td>
      <td>-0.262330</td>
      <td>...</td>
      <td>0.23946</td>
      <td>-0.23946</td>
      <td>7.045668</td>
      <td>-0.381237</td>
      <td>-0.51436</td>
      <td>-0.74719</td>
      <td>-0.47077</td>
      <td>-0.341515</td>
      <td>0.286628</td>
      <td>-0.286628</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.182887</td>
      <td>0.138965</td>
      <td>0.223825</td>
      <td>0.243104</td>
      <td>0.199688</td>
      <td>0.283535</td>
      <td>0.182700</td>
      <td>0.137060</td>
      <td>0.225079</td>
      <td>-0.191497</td>
      <td>...</td>
      <td>0.23946</td>
      <td>-0.23946</td>
      <td>7.045668</td>
      <td>-0.381237</td>
      <td>-0.51436</td>
      <td>-0.74719</td>
      <td>-0.47077</td>
      <td>-0.341515</td>
      <td>0.286628</td>
      <td>-0.286628</td>
    </tr>
    <tr>
      <th>3</th>
      <td>2.065314</td>
      <td>2.071514</td>
      <td>2.055203</td>
      <td>2.105747</td>
      <td>2.095231</td>
      <td>2.111937</td>
      <td>2.075597</td>
      <td>2.121536</td>
      <td>2.029025</td>
      <td>-0.460802</td>
      <td>...</td>
      <td>0.23946</td>
      <td>-0.23946</td>
      <td>7.045668</td>
      <td>-0.381237</td>
      <td>-0.51436</td>
      <td>-0.74719</td>
      <td>-0.47077</td>
      <td>-0.341515</td>
      <td>0.286628</td>
      <td>-0.286628</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.235031</td>
      <td>0.159379</td>
      <td>0.305712</td>
      <td>0.281378</td>
      <td>0.213312</td>
      <td>0.344959</td>
      <td>0.137269</td>
      <td>0.104510</td>
      <td>0.167657</td>
      <td>-0.429507</td>
      <td>...</td>
      <td>0.23946</td>
      <td>-0.23946</td>
      <td>7.045668</td>
      <td>-0.381237</td>
      <td>-0.51436</td>
      <td>-0.74719</td>
      <td>-0.47077</td>
      <td>-0.341515</td>
      <td>0.286628</td>
      <td>-0.286628</td>
    </tr>
  </tbody>
</table>
<p>5 rows × 459 columns</p>
</div>




{% highlight python linenos %}
# split the data

X_train = pd.DataFrame(X_all[:len(X_train)])
X_test = pd.DataFrame(X_all[len(X_train):])
length = len(X_train)

y = X_train["price_doc"]

    
X_train_transformed = X_train.drop(["price_doc"], axis = 1).copy()
{% endhighlight %}
<br />

{% highlight python linenos %}
X_matrix = X_train_transformed.as_matrix()
y_matrix = y.as_matrix()
{% endhighlight %}
<br />

{% highlight python linenos %}

{% endhighlight %}
<br />

{% highlight python linenos %}
# test it with linear regression

from sklearn.linear_model import LinearRegression

lr_clf = LinearRegression()
lr_clf.fit(X_train_transformed, y)
{% endhighlight %}
<br />

{% highlight python linenos %}
# display all scores in one go

def display_scores(scores):
    print("Scores:", scores)
    print("Mean:", round(scores.mean()))
    print("Standard deviation:", scores.std())
{% endhighlight %}
<br />

{% highlight python linenos %}
from sklearn.model_selection import cross_val_score

lr_scores = cross_val_score(lr_clf,X_train_transformed, y, scoring="neg_mean_squared_error", cv=10)
lr_rmse_scores = np.sqrt(-lr_scores)
display_scores(lr_rmse_scores)
{% endhighlight %}
<br />

{% highlight python linenos %}
Scores: [  4.24231011e+06   9.91980367e+06   3.43953083e+06   7.66985806e+09
   7.71852130e+06   3.62683154e+06   3.25531314e+09   3.32414976e+06
   3.42314427e+06   3.91199943e+06]
Mean: 1096477749.0
Standard deviation: 2395858735.05
{% endhighlight %}

{% highlight python linenos %}
from sklearn.metrics import mean_squared_error

lr_predictions = lr_clf.predict(X_train_transformed)
lr_mse = mean_squared_error(y, lr_predictions)
lr_smre = np.sqrt(lr_mse)
lr_smre
{% endhighlight %}
<br />

    3468938.7143163057

{% highlight python linenos %}
# predict for test with linear regression

X_test_matrix = X_test.drop(["price_doc"], axis = 1).copy().as_matrix()
y_predictions = lr_clf.predict(X_test_matrix)
y_predictions = y_predictions.round()
linear_results = pd.DataFrame(
    {
        "id": ids[length:],
        "price_doc": y_predictions
    }
)
linear_results.to_csv("data/russian_house_market/linear_results.csv", index=False)
{% endhighlight %}
<br />

{% highlight python linenos %}
# gradient boosting

from sklearn.ensemble import GradientBoostingRegressor

gbr = GradientBoostingRegressor()
gbr.fit(X_train_transformed, y)
gbr_predictions = gbr.predict(X_test_matrix)
gbr_results = pd.DataFrame(
    {
        "id": ids[length:],
        "price_doc": gbr_predictions
    }
)
gbr_results.to_csv("data/russian_house_market/gbr_results.csv", index=False)
{% endhighlight %}
<br />

{% highlight python linenos %}
# random forest regressor

from sklearn.ensemble import RandomForestRegressor

rfr = RandomForestRegressor()
rfr.fit(X_train_transformed, y)
rfr_predictions = rfr.predict(X_test_matrix)
rfr_results = pd.DataFrame(
    {
        "id": ids[length:],
        "price_doc": rfr_predictions
    }
)
rfr_results.to_csv("data/russian_house_market/rfr_results.csv", index=False)
{% endhighlight %}
<br />

{% highlight python linenos %}
rfr_scores = cross_val_score(rfr,X_train_transformed, y, scoring="neg_mean_squared_error", cv=10)
rfr_rmse_scores = np.sqrt(-rfr_scores)
display_scores(rfr_rmse_scores)
{% endhighlight %}
<br />
{% highlight python linenos %}
    Scores: [ 4028866.76898487  2399962.99959557  2670868.71730077  2653273.81372096
      2688965.95341056  3039268.45804425  2772076.02745459  2517358.66164347
      2498985.05770515  3120309.95459634]
    Mean: 2838994.0
    Standard deviation: 451286.366994

{% endhighlight %}

{% highlight python linenos %}
gbr_scores = cross_val_score(gbr,X_train_transformed, y, scoring="neg_mean_squared_error", cv=10)
gbr_rmse_scores = np.sqrt(-gbr_scores)
display_scores(gbr_rmse_scores)
{% endhighlight %}
<br />

{% highlight python linenos %}
# extreme gradient boosting

from xgboost import XGBRegressor

xgb = XGBRegressor()
xgb.fit(X_train_transformed, y)
{% endhighlight %}
<br />

{% highlight python linenos %}
# xgb with test

xgb_predictions = xgb.predict(X_test_matrix)
xgb_results = pd.DataFrame(
    {
        "id": ids[length:],
        "price_doc": xgb_predictions
    }
)
xgb_results.to_csv("data/russian_house_market/xgb_results.csv", index=False)
{% endhighlight %}
<br />
</div>
