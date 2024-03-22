## February 19, 2024 - February 26, 2024

This will be a journal for the first from the 19th - 26th

This week, I worked on:

* Created, cloned, and tested docker for the project

Jonathan forked the project and did all of the necessary steps in
order to allow everyone access. Cloned the project and pruned and
composed the docker.

Created Ronnie.md in journals to start my journal.

We finished our framework and defined out endpoints and are now waiting
for them to be checked.

## reflection on design
After getting feedback on our project, we are realizing how far our project
can deviate from our original design. If we decide we don't want a particular
feature we also have to look through our project to remove sections that are tied
to the feature that we are removing. If not, dead code will be left in.

## ah-ha! moment
We found out that we don't have to create a new project to change the name
of the project. There is a place to change the pathways which avoids having
to restart everything.
git


## February 26th, 2024 - March 1, 2024

This week, I worked on:

As a group we made the decision to use SQL database.
Using SQL, I set up beekeeper studio and created a "users" table.
Johnathan lead the work to create a POST and create the backend authentication.
Yutong and I, followed and tinkered on our local branch to get hands on experience.

## ah-ha! moment

This week it took a bit to understand the relationship between fastapi, beekeeper, and migrations.
After some time and some other tutorials, it clicked and everything started to make more sense.
I was able to use all three to create a table and use a fastapi to get data from the database.


## March 4, 2024 - March 8, 2024

This week, I worked on:

Created the backend and frontend for the login and signup. Created front end authorization.
It took a bit to get used to how the frontend and backend interact with tokens. Was able to
get the backend authorizations to work but during the creation of the frontend there was a
few errors that popped up.

Found out the error was due to jwtdown and were told to ignore it due to it not affecting
the functionality of our application.

## March 11, 2024 - March 14, 2024

This week, I worked on:

Created authorization verification and new login form for the home page. Created checks that showed
the user different information on their webpages depending if they were logged in or not. At first
I tried to create functions to pull the token from the cookie location until I realized that the
galvanize library I was using for the token creation had everything I needed already to do what I
wanted. All i needed to do was check if there was a token and return a boolean. Then used a isLoggedIn
function to show the user the page they are authorized to see.

What I learned:
I should make sure to read what the libraries I'm using can do before trying to create a solution myself.



## March 18, 2024 - March 22, 2024

This week, I worked on:

Finished the users settings and implemented a way for the user to edit their setting with a PUT request.
Once that was done I tried to make a pytest for it but realized I still needed to create a backend endpoint
that doesn't involve the login or signup. I created a interests table, backend, and frontend. This allows the
user to input their interests, hobbies, describe their perfect day, if they have children, and a picture of their pets.
In compared to creating the authenticator it was much easier with only a few hiccups with error messages. After I created
the interests, I created the pytest to test the interests backend and it came back successfully.

What I learned:

After completing a majority of this project I learned the importance of focusing on scope and what is the
minimum requirement. Sometimes I would focus on a particular function of the project only to realize that I
really didn't need to be working on this and it should be left for a stretch goal.


## reflection on design

If I were to reflect on the design of our site I would leave more room to be flexible and come up with more ideas
incase one idea flops there would be more that can be picked up and implemented. I would like to work more on the
design of the site but due to how long it took to get it functional we wanted to be 100% confident that we have a
functional site rather than a site that looks ok but doesn't work.
