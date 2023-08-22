# Deployment steps 
Here, you will find all the steps udes to deploy my book management application .

## First preparing the application for deployment:
- making sure app is running on port 80.
- adding health route to the app :

```javascript
app.get("/health", function (req, res) {
	res.sendStatus(200).send(" healthyyy");
})
```
- creating a new release that contains the files on github and setting it as the latest.

## Second Creating a template:
as the images shows the steps, those are the used settings of my template :

step 1: 

![](./images/temp1.png)

step 2 :

![](./images/temp2.png)

step 3 :

![](./images/temp3.png)

step 4:

![](./images/temp4.png)

*Step 5* : adding my own script in the advanced settings to run when launching the instance.

### *All Done !*
Template has been created, now we're ready to create an auto scalling group !

![](./images/temp6.png)

## Third creating an Auto scalling Group:
here are screenshots of the used settings to create my own auto scalling group : 

![](./images/asg1.png)

![](./images/asg2.png)

![](./images/asg3.png)

![](./images/asg4.png)

![](./images/asg5.png)

![](./images/asg6.png)

![](./images/asg7.png)

![](./images/asg8.png)

![](./images/asg9.png)

#### setting the scaling policy to use the Average CPU utilization metric of value 60:

![](./images/asg10.png)

![](./images/asg11.png)

![](./images/asg12.png)

![](./images/asg13.png)

![](./images/asg14.png)

![](./images/asg15.png)

### *All Done !*
Auto scalling group has been created, now we're ready to go !

![](./images/asg16.png)



## Fourth Editing Health check settings:

editing health check settings in our target group and adding the route /health to it to check health of the instances.

## Fifth checking everything is working:
now we can run our deployed app to check everything is working.

### *All Done !*