## Inspiration:
I believe that the strength of Metaphor is that it can give tailored search results that a simple Google search just isn’t built to do right now. For instance, tailoring results based on who the user is (prompting the query by saying you’re a child or perhaps a teacher) or writing full paragraphs with many details. 

For me, one of my favorite hobbies is DnD, and I actually run my own games. Part of running those games is coming up with a story and creating encounters, which can be hard. Coming up with things from scratch is rewarding, since it is all my own, but it’s difficult and long to do without a base. 

My inspiration for this project is creating a simple web app that allows Dungeon Masters (DM) like me to query the Metaphor API for different aspects of the game they might want to run. For instance, finding links to similar existing one-shots based on the plot idea someone might have, finding links or summaries to stories and mythos that the DM might want to base the adventure on, or finding links to different DnD monsters they might be interested in running. 


## The key components:
`A field in which the user can enter their plot to find one-shots with similar plots`

Returns a list of titles and links the user can reference or check out

`A field in which the user can enter different words to find a story with those aspects (for instance, the user can enter “dragons” and “princesses” to find a story with dragons and princesses)`

Returns a list of titles and links. Has a button to summarize the story. 

`A field in which the user can pull DnD monsters based on different attributes they want the monster to have`

Returns a list of titles and links. 

`A field in which users can find real (and by real, I mean monsters from real myths) monsters to base their DnD monster off of. `

Returns a list of titles and links. Has a button to summarize the story. 


The idea of this project is to give DMs a tool in which they can easily find different components of their one-shot. For monster hunting specifically, it can take hours to find a suitable base (depending on how stringent you are and how comfortable you are with adjusting the monster yourself). 

---

## Implementation
React and Javascript are my languages of choice since this is meant to be a web-app. The different sections I outlined above will be literal sections in the web app. 

I used a free trial with MeaningCloud to get the API key needed to summarize the contents of some of the HTML pages, specifically the ones from the stories and monster legends lookup. 

To protect my API keys, I used a .env file. To run the app, you’ll need to have dotenv installed.

---

### Running the app
To run the app, make sure you're in the project folder, and run `npm start`. This will run the app locally.

In order to use the Metaphor and MeaningCloud APIs, you will need their respective API token. Make sure you have `dotenv` installed, and created an `.env` file to store your API keys. 

They should be stored like such:

-----
// for Metaphor

REACT_APP_METAPHOR_KEY = your_key_here

// for MeaningCloud

REACT_APP_MEANING_CLOUD_KEY = your_key_here

---
Since this a React app, you need `REACT_APP_` and the start of the key name.

