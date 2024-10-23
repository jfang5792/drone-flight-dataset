## Drone Flight Dataset with AI integration

I developed a responsive user interface that enables users to input and retrieve drone flight information. By integrating an AI client powered by OpenAI, this app can process natural language queries trained on multiple drone flight datasets. Each dataset corresponds to an image captured during a drone flight. The LLM is provided with a drone flight dataset as input to generate responses.

Technologies: Python, JavaScript, React, SQLAlchemy, Flask, Vite, Bootstrap, HTML, CSS, OpenAI API

#
![liveErrHandling-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/f3a26a1c-d5d2-482a-b156-2ba945edda91)

## Getting started

Clone this repo:

```sh
https://github.com/jfang5792/drone-flight-dataset.git
```

To run this app on your local machine, initiate a virtual environment (<a href="https://virtualenv.pypa.io/en/stable/" rel="">Python documentation: virtual environment tool</a>):

```sh
$ virtualenv env
```

Activate the virtual environment:

```sh
source env/bin/activate
```

*Install the library requirements:

```sh
(env)$ pip3 install -r requirements.txt
```
##
Create secrets.sh file in the root directory:

```sh
touch secrets.sh
```

Run this command to create your own Flask secret key:

```sh
echo "export FLASK_SECRET_KEY=$(python3 -c 'import os; print(os.urandom(24).hex())')"
```

Example output will look like the below, please copy and paste your unique output to your `secrets.sh` file:

```sh
export FLASK_SECRET_KEY=dbcacd3b0d4d779egl5225bb0d5a6vbf098fb0efp5120l77
```

Since this app requires OpenAI integration, create an api key on their
<a href=https://platform.openai.com/docs/quickstart >site directly.</a>
Example below, you'll want to grab that and replace `"your_api_key_here"` with your unique api key. Copy and paste that into secrets.sh file.

```sh
export OPENAI_API_KEY="your_api_key_here"
```

Execute secrets.sh:

```sh
source secrets.sh
```
##
Open a split terminal. In your first terminal that's already in a virtual environment, run this command to start the backend:

```sh
python3 server.py
```

For your second terminal, run commands to start the frontend:

```sh
cd frontend
npm install
npm run dev
```
##
### Voila! You're in.
#

To deactivate the virtual environment, run this command in terminal:

```sh
deactivate
```

#
Further expansion:
- Update the quick lookup section:
  
![quickSearchErrHandling-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/69a13018-5d8a-408e-95d3-6c918dda8517)

- More API error handling, consider when there are multiple given datasets
- Implement basic unit tests
- Add a feature that allows sorting or filtering the drone data table based on
user-selected criteria. An example: re-order flights based on altitude meters similar to filtering columns in google sheets.
