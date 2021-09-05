# roomruler

## Inspiration

When I studied at school, lessons and after-school activities often took part in other rooms rather than specified in a timetable. So, sometimes, two classes planed to take lesson at the same room. Moreover, we had to go around the whole school to find a free one.
I wondered if there is a way to build system which will help to distribute available class rooms and check where are they located. Then I didn't have enough free time to do it (It was my graduation year). But now, when I came across this hackathon, I found how can I make teachers and students lives easier.

## What it does

I built a web application which displays a simple map of building with rooms on it. Rooms may have lables like their numbers. Color of rooms indicates if they are free or occupied (green and grey respectively). Also there is a panel with list of rooms on the right. You can filter list based on room state.
If you want to take a class room, you must mark it as occupied and mark it free later. By clicking on map, you can toggle room state. It is synched across all users.
All this functionality is wrapped in modern Material design and respects device's theme (Dark mode).

## How we built it

I built a WebSocket webserver with node.js. It is connected to [CockroachDB](https://www.cockroachlabs.com) to persist rooms data. When users connect, all rooms state is sent to them with `list` message. Then, server receives `update` message, it updates database record and sends information about it to all users.
Client application is a React.js SPA. It displays rooms plan with with Canvas API and interact with server with WebSocket client. When user changes room state, `update` message is sent and client waits for server response and then updates state. It is done to simplify addition of filtration or authentification in future.
All code is structured in [monorepo](https://github.com/dm1sh/roomruler) on GgitHub. It easies development environment and production deployment.

## Challenges we ran into

While working on project I had to strictly discipline myself to do exactly what is needed now. I worked alone and had to work super-fast and not to be interrupted by interesting but useless at that stage feature.
Moreover, despite CockroachDB is a great product, I had problems connecting it to Prisma ORM. Because of new for me technologies I used, sometimes I stucked with easy problems, but it is the essence of the educational process and I had a lot of fun.

## Accomplishments that we're proud of

I didn't expect that this project will interest me so much. But I'm proud of myself, than I have been able to finish it. I also like the organization of code, I have built during the hackathon.

## What we learned

This hackathon I tried a couple of new technologies like Vite as build system for frontend and WebSocket for client-server comunication. Because of problems with Prisma ORM I tried TypeORM as database driver and wrote my first lines of SQL code to bootstrap DB data. I also feel like I'm getting better developer every project I finish. I got more experienced in TypeScript and JavaScript overall.

## What's next for roomruler

It is still a proof-of-concept, so many interesting features like timetable integration or building plan construction are not implemented yet. I was going to add authentification and users roles to restrict some class rooms to teachers only and to control rooms distribution. Also, to ease distribution of app, map builder is required. Multiple buildings on one server are also good idea, i think.
As for usage, if you want to use it in your school, you are welcome. Add your school schema to database and manage class rooms with ease. :D
I don't know if it will be useful in my university, but it is already usable enough.
