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
