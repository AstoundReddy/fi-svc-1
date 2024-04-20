# Application Documentation

## Running the Application

### Prerequisites
- **Java**: Ensure that Java 11 or higher is installed on your machine. To verify, run `java -version` in your terminal or command prompt. If Java is not installed, download and install it from [Oracle's website](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) or use an OpenJDK distribution.

### Installation
1. **Download the `.jar` File**: Click on the following link to download the `.jar` file:

   [Download Application](https://iitkgpacin-my.sharepoint.com/:u:/g/personal/aryachandanreddy_iitkgp_ac_in/EZtOLKVtgzhAptdX-Wl2BEUBV62GXBX3GOC4pHp04UWuZA?e=tK2tba)

2. **Save the File**: Save the file to a convenient location on your machine, such as your desktop or a dedicated folder.

### Running the Backend
1. **Open Terminal or Command Prompt**: Navigate to the directory where you downloaded the `.jar` file.

2. **Execute the Jar File**: Run the following command in your terminal or command prompt:
   ```bash
   java -jar .\Spendwise-0.0.1-SNAPSHOT.jar

Once the backend is up, we go to Frontend

## Running the Frontend

### Prerequisites
- **Node.js and Yarn**: Ensure that Node.js is installed on your machine along with Yarn, which is used to manage the dependencies of the frontend application. You can check their installation by running `node -v` and `yarn -v` in your terminal. If these are not installed, download and install Node.js from [Node.js official website](https://nodejs.org/) and Yarn from [Yarn's official site](https://yarnpkg.com/).

### Installation
1. **Clone the Repository**: If you haven't already cloned the repository, do so with the following command:
   ```bash
   git clone https://github.com/AstoundReddy/fi-svc-1.git
2. After cloning, navigate to the frontend directory, install the dependencies and run the application:
   ```bash
   cd fi-svc-1/frontend
   yarn install
   yarn start
3. The application is up and running on localhost at port 3000
   ```bash
    http://localhost:3000/

### Endpoint Documentation
1. This is a postman collection of all the designed and used API endpoints: Spendwise.postman_collection.json.
2. Download the file and import it Postman to test the APIs.
