# Sample-Donation-App
An app that uses Cloud Flair worker, and Planet-Scale Database to give the ability to create, Read, and Update the donation so far and delete the donation using API calls.

## Cloning a repository
- [x] 1. On GitHub.com, navigate to the main page of the repository.
- [x] 2. Above the list of files, click  Code.

     <img src="https://docs.github.com/assets/cb-32892/mw-1440/images/help/repository/code-button.webp" width="60%" height="40%">

- [X] 3. Copy the URL for the repository.

     <img src="https://docs.github.com/assets/cb-45942/mw-1440/images/help/repository/https-url-clone-cli.webp" width="60%" height="30%">
		 
- [X] 4. Open Git Bash
- [X] 5. Change the current working directory to the location where you want the cloned directory.
- [X] 6.Type git clone, and then paste the URL you copied earlier.
```
git clone https://github.com/Rishav9852Kumar/Sample-Donation-App.git
```
- [X] 7. Press Enter to create your local clone.

## Setting Up Projects and tools

### Step 0: Set up 
- Install all required dependencies
  ```
  npm install
  ```
* Deploy your code to your cloud flair using the command
  ```
  npx wrangler publish
  ```
+ <a href="https://www.postman.com/" target="_blank">Open Postman</a>
* Copy and store the URL of your Cloudflare endpoint
  ```
  https://planetscale-worker.rishav-5d9.workers.dev/
  ```
## Starting with the project 
### Case 1: Create a new Fundraiser 
1. Choose a sample name and description, and target amount for your fundraiser 
1. Prepare a JSON request
   ```
   {
   "title": "My sample fundraiser 1",
   "description": "This is a description of my fundraiser 1.",
   "target_amount": 10000
    }
   ```
1. Hit the planet Scale URL with the above raw JSON payload with the PUT request
2. **Response**
   ```
   " no of new fundraiser added = 1"
   [
    {
    "fundraiser_id": 1,
    "fundraiser_title": "My sample fundraiser 1",
    "fundraiser_description": "This is a description of my fundraiser 1.",
    "target_donation": "10000.00",
    "current_donation": "0.00"
    }
   ]
   ```



for delete: -
{
  "id": 4
}

for Post : -

for : - update
{
  "id": 2,
  "amount": 50
}

