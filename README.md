<body>
  <h1>JobsAPI</h1>
  <p> JobsAPI is a Node.js API that allows users to register, create, update, and delete jobs. </p>
  <h2>Author</h2>
  <p>Muslim Shah</p>
  <h2>Date</h2>
  <p>May 25, 2023</p>
  <h2>Cloning the Repository</h2>
  <p>To clone the JobsAPI project, follow these steps:</p>
  <pre>	<code>git clone git@github.com:MuslimShah/JobsAPI.git</code></pre>
  <h2>Installation</h2>
  <p>Before running the API, make sure you have the following dependencies installed:</p>
  <ul>
    <li>Node.js</li>
    <li>npm (Node Package Manager)</li>
    <li>MongoDB</li>
  </ul>
  <p>After cloning the repository, navigate to the project directory and install the required dependencies:</p>
  <pre>	<code>npm install</code></pre>
  <h2>Configuration</h2>
  <p>Make sure to set up the following environment variables:</p>
  <ul>
    <li>PORT: The port on which the API will run</li>
    <li>MONGODB_URI: The connection URI for MongoDB</li>
  </ul>
  <p>You can create a <code>.env</code> file in the project root directory and set the environment variables there. </p>
  <h2>Starting the API</h2>
  <p>Once the installation and configuration are complete, you can start the API by running:</p>
  <pre>	<code>npm start</code></pre>
  <h2>API Routes</h2>
  <h3>/api/v1/auth</h3>
  <ul>
    <li>POST /register</li>
    <li>POST /login</li>
  </ul>
  <h3>/api/v1/jobs (Authentication required)</h3>
  <ul>
    <li>GET / (Get all jobs created by the user)</li>
    <li>POST / (Create a new job)</li>
    <li>GET /:id (Get a single job by ID)</li>
    <li>PATCH /:id (Update a job by ID)</li>
    <li>DELETE /:id (Delete a job by ID)</li>
  </ul>
  <h2>Create Job Request</h2>
  <p>To create a new job, send a POST request to the following endpoint:</p>
  <pre>	<code>POST /api/v1/jobs</code>
	</pre>
  <p>The request body should contain the following data:</p>
  <ul>
    <li>
      <strong>company</strong> (string): The name of the company.
    </li>
    <li>
      <strong>position</strong> (string): The position of the job (e.g., intern, engineer, manager).
    </li>
  </ul>
  <p>Example request body:</p>
  <pre>	<code>{
  "company": "google",
  "position": "intern"
}</code>
	</pre>
  <h2>Register User Request</h2>
  <p>To register a new user, send a POST request to the following endpoint:</p>
  <pre>	<code>POST /api/v1/auth/register</code>	</pre>
  <p>The request body should contain the following data:</p>
  <ul>
    <li>
      <strong>name</strong> (string): The name of the user.
    </li>
    <li>
      <strong>email</strong> (string): The email address of the user.
    </li>
    <li>
      <strong>password</strong> (string): The password for the user's account.
    </li>
  </ul>
  <p>Example request body:</p>
  <pre>	<code>{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}</code></pre>
  <h2>Login Request</h2>
  <p>To authenticate a user and obtain a token, send a POST request to the following endpoint:</p>
  <pre>	<code>POST /api/v1/auth/login</code></pre>
  <p>The request body should contain the following data:</p>
  <ul>
    <li>
      <strong>email</strong> (string): The email address of the user.
    </li>
    <li>
      <strong>password</strong> (string): The password for the user's account.
    </li>
  </ul>
  <p>Example request body:</p>
  <pre>	<code>{
  "email": "johndoe@example.com",
  "password": "password123"
}</code></pre>
  <h2>Responses</h2>
  <ul>
    <li>Register Response: <ul>
        <li>Status: 201</li>
        <li>Body: { user: { name: user.name }, token }</li>
      </ul>
    </li>
    <li>Login Response: <ul>
        <li>Status: 200</li>
        <li>Body: { user: { name: user.name }, token }</li>
      </ul>
    </li>
    <li>Get All Jobs Response: <ul>
        <li>Status: 200</li>
        <li>Body: { jobs: allJobs, count: allJobs.length }</li>
      </ul>
    </li>
    <li>Get Single Job Response: <ul>
        <li>Status: 200</li>
        <li>Body: singleJob </ </ul>
        </li>
        <li>Create Job Response: <ul>
            <li>Status: 201</li>
            <li>Body: { job, msg: "Job created successfully" }</li>
          </ul>
        </li>
        <li>Update Job Response: <ul>
            <li>Status: 200</li>
            <li>Body: { job, msg: "Job updated successfully" }</li>
          </ul>
        </li>
        <li>Delete Job Response: <ul>
            <li>Status: 200</li>
            <li>Body: { msg: "Job deleted successfully" }</li>
          </ul>
        </li>
      </ul>
      <h2>Security Packages</h2>
      <ul>
        <li>helmet: Provides various security-related HTTP headers.</li>
        <li>cors: Enables Cross-Origin Resource Sharing (CORS) for handling requests from different domains.</li>
        <li>xss-clean: Prevents Cross-Site Scripting (XSS) attacks by sanitizing user input.</li>
        <li>express-limiter: Implements rate limiting to protect against brute force and denial-of-service attacks.</li>
      </ul>
      <h2>Error Handling</h2>
      <ul>
        <li>express-async-errors: Handles asynchronous errors in Express middleware and routes.</li>
      </ul>
      <h2>Database</h2>
      <ul>
        <li>MongoDB: A NoSQL database for storing user and job data.</li>
        <li>Mongoose: An Object Data Modeling (ODM) library for MongoDB to provide a more intuitive interface for interacting with the database.</li>
      </ul>
      <h1>Use MY Deployed version</h1>
      <h2>URL</h2>
      <pre><code>https://nice-lime-cockatoo-wig.cyclic.app</code></pre>
      <p>Just include before your endpoint</p>
      <h1>EXAMPLE</h1>
      <pre><code>https://nice-lime-cockatoo-wig.cyclic.app/api/v1/jobs</code></pre>
</body>
