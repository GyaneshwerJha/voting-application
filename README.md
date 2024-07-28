{
	"info": {
		"_postman_id": "04725aed-afbe-4786-b0eb-6939834bf73f",
		"name": "voting-application",
		"description": "Our Voting Application is a robust and secure platform designed to facilitate fair and transparent elections. It offers a comprehensive suite of features that cater to the needs of voters, candidates, and administrators, ensuring a seamless and secure voting experience. The application is built with modern technologies, emphasizing data security, user privacy, and ease of use.\n\n**Key Features:**\n\n1. **User Authentication:**\n    \n    - Secure sign-up and login with Aadhar card verification.\n        \n    - Two-Factor Authentication (2FA) for enhanced security.\n        \n    - Password management, including password change functionality.\n        \n2. **Candidate Management:**\n    \n    - Admin functionality to create, update, and delete candidate profiles.\n        \n    - Display of detailed candidate information, including name, party affiliation, and manifesto.\n        \n    - Real-time vote count tracking for each candidate.\n        \n3. **Election Management:**\n    \n    - Creation and management of election events, including start and end dates.\n        \n    - Activation and deactivation of elections to control voting periods.\n        \n4. **Voting System:**\n    \n    - Secure and anonymous voting mechanism for eligible users.\n        \n    - Voter verification to ensure only registered users can vote.\n        \n    - Recording and storage of voting history for audit and transparency.\n        \n5. **Feedback and Reporting:**\n    \n    - Users can provide feedback on the voting process and report issues.\n        \n    - Administrators can review and act on user feedback to improve the system.\n        \n6. **Notification System:**\n    \n    - Real-time notifications to keep users informed about important updates, including election results and system alerts.\n        \n7. **Security and Privacy:**\n    \n    - Use of JWT tokens for secure session management.\n        \n    - Data encryption and secure storage of sensitive information.\n        \n    - Compliance with privacy regulations and best practices to protect user data.\n        \n\n**Technologies Used:**\n\n- **Backend:** Node.js, Express.js, MongoDB\n    \n- **Security:** bcrypt for password hashing, JWT for authentication, 2FA for additional security layers",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "30907444"
	},
	"item": [
		{
			"name": "authentication",
			"item": [
				{
					"name": "signup",
					"request": {
						"method": "POST",
						"header": [],
						"url": {
							"raw": "http://localhost:5000/api/auth/signup",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "5000",
							"path": [
								"api",
								"auth",
								"signup"
							]
						},
						"description": "Registers a new user with Aadhar, email, and password. The password is securely hashed before storing in the database.\n\n**Request Body:**\n\n- `aadhar` (string, required): The user's Aadhar number.\n    \n- `password` (string, required): The user's password.\n    \n- `email` (string, required): The user's email address.\n    \n\n**Responses:**\n\n- `201 Created`: User registered successfully.\n    \n- `500 Internal Server Error`: Failed User registration or User already exists.\n    \n\n**Example Request Body:**\n\n``` bash\n{\n    \"aadhar\": \"123456789012\",\n    \"password\": \"Password123!\",\n    \"email\": \"user@example.com\"\n}\n\n ```\n\n<img src=\"https://content.pstmn.io/cef10900-7861-4c02-b214-897e9f8166de/aW1hZ2UucG5n\" alt=\"\" height=\"1336\" width=\"1376\">"
					},
					"response": []
				},
				{
					"name": "login",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "\n// Admin\n// {\n//     \"aadhar\": \"123456789012\",\n//     \"password\": \"1234432156788765\"\n// }\n\n// User Sonu\n// {\n//     \"aadhar\": \"123456789013\",\n//     \"password\": \"1234432156788765\"\n// }\n\n// User Gyaneshwer\n// {\n//     \"aadhar\": \"123456789014\",\n//     \"password\": \"1234432156788765\"\n// }\n",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:5000/api/auth/login",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "5000",
							"path": [
								"api",
								"auth",
								"login"
							]
						},
						"description": "Logs in a user with Aadhar and password. If two-factor authentication (2FA) is enabled and not verified, an OTP is sent to the user's email. The user must verify the OTP to complete the login.\n\n**Request Body:**\n\n- `aadhar` (string, required): The user's Aadhar number.\n    \n- `password` (string, required): The user's password.\n    \n\n**Responses:**\n\n- `200 OK`: Login successful, returns JWT token or OTP sent.\n    \n- `401 Unauthorized`: Invalid Aadhar or password.\n    \n- `500 Internal Server Error`: Error in login.\n    \n\n**Example Request Body:**\n\n``` bash\n{\n    \"aadhar\": \"123456789012\",\n    \"password\": \"Password123!\"\n}\n\n ```\n\n<img src=\"https://content.pstmn.io/2fcb2eae-30d0-40d9-a9d6-70fdc39f059a/aW1hZ2UucG5n\" alt=\"\" height=\"1450\" width=\"1368\">"
					},
					"response": []
				},
				{
					"name": "verify-otp",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{   \"aadhar\": \"123456789014\",\n    \"otp\": \"526148\"\n}\n",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:5000/api/auth/verifyOtp",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "5000",
							"path": [
								"api",
								"auth",
								"verifyOtp"
							]
						},
						"description": "Verifies the OTP sent during the login process for users with two-factor authentication (2FA) enabled.\n\n**Request Body:**\n\n- `aadhar` (string, required): The user's Aadhar number.\n    \n- `otp` (string, required): The OTP sent to the user's email.\n    \n\n**Responses:**\n\n- `200 OK`: OTP verified successfully, returns JWT token.\n    \n- `400 Bad Request`: Invalid or expired OTP.\n    \n- `500 Internal Server Error`: Error in OTP verification.\n    \n\n**Example Request Body:**\n\n``` bash\n{\n    \"aadhar\": \"123456789012\",\n    \"otp\": \"123456\"\n}\n\n ```\n\n<img src=\"https://content.pstmn.io/cbd44530-d308-438f-89fd-67dc3ee7935c/aW1hZ2UucG5n\" alt=\"\" height=\"1444\" width=\"1372\">"
					},
					"response": []
				},
				{
					"name": "change-password",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Authorization",
								"value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTY1NTdhYjhjZGQyMDdkY2QzMTQ4ZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzIyMTc3NTQwLCJleHAiOjE3MjIxODExNDB9.CsAQDigJ6vXSHnMoFgG0Sd6qBBxyJxL3WumtzRT46s0",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"currentPassword\" : \"Password123!\",\n    \"newPassword\" : \"1234432156788765\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:5000/api/auth/change-password",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "5000",
							"path": [
								"api",
								"auth",
								"change-password"
							]
						},
						"description": "Allows a logged-in user to change their password by providing the current password and a new password.\n\nIn Postman\n\n1. Select the request (e.g., `POST /change-password`).\n    \n2. Go to the \"Headers\" tab.\n    \n3. Add a new key-value pair:\n    \n    - **Key:** `Authorization`\n        \n    - **Value:** `Bearer YOUR_JWT_TOKEN_HERE`\n        \n\n**Request Body:**\n\n- `currentPassword` (string, required): The user's current password.\n    \n- `newPassword` (string, required): The new password.\n    \n\n**Responses:**\n\n- `200 OK`: Password changed successfully.\n    \n- `401 Unauthorized`: Current password does not match.\n    \n- `404 Not Found`: User not found.\n    \n- `500 Internal Server Error`: Error in changing password.\n    \n\n**Example Request Body:**\n\n``` bash\n{\n    \"currentPassword\": \"CurrentPassword123!\",\n    \"newPassword\": \"NewPassword456!\"\n}\n\n ```\n\n<img src=\"https://content.pstmn.io/2c44d601-9100-4ec2-93a5-55da0df37d44/aW1hZ2UucG5n\" alt=\"\" height=\"1442\" width=\"1398\">"
					},
					"response": []
				}
			],
			"description": "The authentication module handle secure user access to the application. It provides functionalities for user registration, login, and two-factor authentication (2FA). This module ensures that only verified users can access the system by utilizing JWT tokens for session management and bcrypt for secure password storage."
		},
		{
			"name": "candidate",
			"item": [
				{
					"name": "create-candidate",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Authorization",
								"value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTY1NTdhYjhjZGQyMDdkY2QzMTQ4ZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMjE3ODM2OCwiZXhwIjoxNzIyMTgxOTY4fQ.mIpP_QtmRvwHXzEDhGGhciy0789RF7qYGyPKF_-ebvc",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n  \"name\": \"David Kim\",\n  \"party\": \"Innovation Party\",\n  \"manifesto\": \"Pushing for technological advancement, innovation in public services, and modern infrastructure.\"\n}\n",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:5000/api/candidates",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "5000",
							"path": [
								"api",
								"candidates"
							]
						},
						"description": "### Create Candidate\n\nThis endpoint allows you to create a new candidate by providing the candidate's name, party, and manifesto.\n\n#### Request Body\n\n- `name`: (string) The name of the candidate.\n    \n- `party`: (string) The party affiliation of the candidate.\n    \n- `manifesto`: (string) The manifesto of the candidate.\n    \n\n#### Response\n\nUpon successful creation, the server will respond with a status code of 201 and a JSON object containing a message confirming the successful creation of the candidate.\n\nExample:\n\n``` json\n{\n    \"message\": \"Candidate created successfully\"\n}\n\n ```\n\n<img src=\"https://content.pstmn.io/aec51d6c-4bff-41f0-9df4-5ce416c58137/aW1hZ2UucG5n\" alt=\"\" height=\"1388\" width=\"1238\">"
					},
					"response": []
				},
				{
					"name": "get-candidates",
					"request": {
						"method": "GET",
						"header": [
							{
								"key": "Authorization",
								"value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTY1NTdhYjhjZGQyMDdkY2QzMTQ4ZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMjE3ODM2OCwiZXhwIjoxNzIyMTgxOTY4fQ.mIpP_QtmRvwHXzEDhGGhciy0789RF7qYGyPKF_-ebvc",
								"type": "text"
							}
						],
						"url": {
							"raw": "http://localhost:5000/api/candidates",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "5000",
							"path": [
								"api",
								"candidates"
							]
						},
						"description": "### GET /api/candidates\n\nThis endpoint retrieves a list of candidates.\n\n#### Request\n\nNo request body is required for this request.\n\n#### Response\n\nThe response will be a JSON array containing objects with the following properties:\n\n- `_id` (string): The unique identifier for the candidate.\n    \n- `name` (string): The name of the candidate.\n    \n- `party` (string): The political party affiliation of the candidate.\n    \n- `manifesto` (string): The manifesto or platform of the candidate.\n    \n- `voteCount` (number): The number of votes received by the candidate.\n    \n- `__v` (number): Version control field.\n    \n\nExample response:\n\n``` json\n[\n    {\n        \"_id\": \"\",\n        \"name\": \"\",\n        \"party\": \"\",\n        \"manifesto\": \"\",\n        \"voteCount\": 0,\n        \"__v\": 0\n    }\n]\n\n ```\n\n<img src=\"https://content.pstmn.io/021980ed-f870-4e91-a3ed-4fe919456510/aW1hZ2UucG5n\" alt=\"\" height=\"1488\" width=\"1256\">"
					},
					"response": []
				},
				{
					"name": "update-candidate",
					"request": {
						"method": "PUT",
						"header": [
							{
								"key": "Authorization",
								"value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTY1NTdhYjhjZGQyMDdkY2QzMTQ4ZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMjE3ODM2OCwiZXhwIjoxNzIyMTgxOTY4fQ.mIpP_QtmRvwHXzEDhGGhciy0789RF7qYGyPKF_-ebvc",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n  \"name\": \"Evelyn Wong\",\n  \"party\": \"Unity Party\",\n  \"manifesto\": \"Building strong communities, promoting inclusivity, and ensuring equal opportunities for all.\"\n}\n",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:5000/api/candidates/66a65b7dce6b9052917d9c65",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "5000",
							"path": [
								"api",
								"candidates",
								"66a65b7dce6b9052917d9c65"
							]
						},
						"description": "### Update Candidate Details\n\nThis endpoint allows the client to update the details of a specific candidate.\n\n#### Request Body\n\n- `name` (string): The updated name of the candidate.\n    \n- `party` (string): The updated political party of the candidate.\n    \n- `manifesto` (string): The updated manifesto of the candidate.\n    \n\n#### Response\n\nThe response is in JSON format and has the following schema:\n\n``` json\n{\n    \"_id\": \"\",\n    \"name\": \"\",\n    \"party\": \"\",\n    \"manifesto\": \"\",\n    \"voteCount\": 0,\n    \"__v\": 0\n}\n\n ```\n\n<img src=\"https://content.pstmn.io/41e7a9f0-9ce7-4ef2-874f-814b4773339c/aW1hZ2UucG5n\" alt=\"\" height=\"1480\" width=\"1240\">"
					},
					"response": []
				},
				{
					"name": "delete-candidate",
					"request": {
						"method": "DELETE",
						"header": [
							{
								"key": "Authorization",
								"value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTY1NTdhYjhjZGQyMDdkY2QzMTQ4ZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMjE3ODM2OCwiZXhwIjoxNzIyMTgxOTY4fQ.mIpP_QtmRvwHXzEDhGGhciy0789RF7qYGyPKF_-ebvc",
								"type": "text"
							}
						],
						"url": {
							"raw": "http://localhost:5000/api/candidates/66a65b7dce6b9052917d9c65",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "5000",
							"path": [
								"api",
								"candidates",
								"66a65b7dce6b9052917d9c65"
							],
							"query": [
								{
									"key": "",
									"value": null,
									"disabled": true
								}
							]
						},
						"description": "### Delete Candidate\n\nDeletes a specific candidate based on the provided candidate ID.\n\n#### Request\n\n- Method: DELETE\n    \n- URL: `http://localhost:5000/api/candidates/:id`\n    \n\n#### Response\n\nThe response for this request can be represented by the following JSON schema:\n\n``` json\n{\n  \"type\": \"object\",\n  \"properties\": {\n    \"message\": {\n      \"type\": \"string\"\n    }\n  }\n}\n\n ```\n\nThe response will include a JSON object with a \"message\" key, which may contain a string value.\n\n<img src=\"https://content.pstmn.io/0c520f0d-e3e8-4583-9fe8-e5fe34cc87e4/aW1hZ2UucG5n\" alt=\"\" height=\"1408\" width=\"1730\">"
					},
					"response": []
				}
			],
			"description": "The candidate management module allows administrators to create, update, and manage candidate profiles. It stores essential information about each candidate, such as their name, party affiliation, and manifesto. This module also track and displays the number of votes each candidate has recieved, providing real-time updates on voting progress."
		},
		{
			"name": "election",
			"item": [
				{
					"name": "create-election",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Authorization",
								"value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTY1NTdhYjhjZGQyMDdkY2QzMTQ4ZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMjE3ODM2OCwiZXhwIjoxNzIyMTgxOTY4fQ.mIpP_QtmRvwHXzEDhGGhciy0789RF7qYGyPKF_-ebvc",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:5000/api/elections/",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "5000",
							"path": [
								"api",
								"elections",
								""
							],
							"query": [
								{
									"key": "",
									"value": null,
									"disabled": true
								}
							]
						},
						"description": "### Create Election\n\nThis endpoint is used to create a new election.\n\n#### Request\n\n- Method: POST\n    \n- URL: `http://localhost:5000/api/elections/create`\n    \n- Body:\n    - `name` (string, required): The name of the election.\n        \n    - `startDate` (string, required): The start date of the election.\n        \n    - `endDate` (string, required): The end date of the election.\n        \n    - `isActive` (boolean, required): Indicates if the election is currently active.\n        \n\n#### Response\n\nThe response for this request is a JSON object with the following schema:\n\n``` json\n{\n    \"type\": \"object\",\n    \"properties\": {\n        \"message\": {\n            \"type\": \"string\"\n        }\n    }\n}\n\n ```\n\n- Status: 200\n    \n- Content-Type: application/json\n    \n\n<img src=\"https://content.pstmn.io/a3bbcfec-4385-4550-aaeb-f6b3cf4f7bd3/aW1hZ2UucG5n\" alt=\"\" height=\"1470\" width=\"1242\">"
					},
					"response": []
				},
				{
					"name": "get-election-status",
					"request": {
						"method": "GET",
						"header": [
							{
								"key": "Authorization",
								"value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTY1NTdhYjhjZGQyMDdkY2QzMTQ4ZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMjE3ODM2OCwiZXhwIjoxNzIyMTgxOTY4fQ.mIpP_QtmRvwHXzEDhGGhciy0789RF7qYGyPKF_-ebvc",
								"type": "text"
							}
						],
						"url": {
							"raw": "http://localhost:5000/api/elections/",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "5000",
							"path": [
								"api",
								"elections",
								""
							]
						},
						"description": "This API endpoint makes an HTTP GET request to retrieve a list of elections. The request does not require any request body parameters. The response will have a status code of 200 and a content type of application/json. The response body will contain an array of election objects, or an empty array if there are no elections available."
					},
					"response": []
				}
			],
			"description": "The election management module facilities the creation and administration of election events. Administratiors can set election start and end dates, activate or deactivate elections, and manage election statuses. This module ensures that elections are conducted within the specified time frames and provides a centralized place for managing all election-related activities."
		},
		{
			"name": "user",
			"item": [
				{
					"name": "get-profile",
					"request": {
						"method": "GET",
						"header": [
							{
								"key": "Authorization",
								"value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTY1YThhY2U2YjkwNTI5MTdkOWM1ZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzIyMTg2Njc3LCJleHAiOjE3MjIxOTAyNzd9.uIVHiLzzyrtcuHkllb4pMyccxE9e14SwB8rr6OIEmQw",
								"type": "text"
							}
						],
						"url": {
							"raw": "http://localhost:5000/api/users/profile",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "5000",
							"path": [
								"api",
								"users",
								"profile"
							]
						},
						"description": "This endpoint makes an HTTP GET request to retrieve the profile of the authenticated user.\n\n### Request\n\nNo request body is required for this endpoint.\n\n- URL: `http://localhost:5000/api/users/profile`\n    \n- Method: `GET`\n    \n\n### Response\n\nUpon a successful execution, the endpoint returns a JSON object with the following fields:\n\n- `_id` (string): The unique identifier of the user's profile.\n    \n- `aadhar` (string): The Aadhar number of the user.\n    \n- `password` (string): The password of the user's account.\n    \n- `role` (string): The role of the user within the system.\n    \n- `email` (string): The email address associated with the user's account.\n    \n- `twoFactorEnabled` (boolean): Indicates whether two-factor authentication is enabled for the user.\n    \n- `isVerified` (boolean): Indicates whether the user's account has been verified.\n    \n- `votingHistory` (array): An array containing the voting history of the user.\n    \n\nThe response is in JSON format with a status code of 200 and a content type of `application/json`.\n\n<img src=\"https://content.pstmn.io/e76bbd4e-05af-4dca-9452-653718437870/aW1hZ2UucG5n\" alt=\"\" height=\"1466\" width=\"1256\">"
					},
					"response": []
				},
				{
					"name": "update-profile",
					"request": {
						"method": "PUT",
						"header": [
							{
								"key": "Authorization",
								"value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTY1YThhY2U2YjkwNTI5MTdkOWM1ZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzIyMTg2Njc3LCJleHAiOjE3MjIxOTAyNzd9.uIVHiLzzyrtcuHkllb4pMyccxE9e14SwB8rr6OIEmQw",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"email\": \"keshavk72411@gmail.com\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:5000/api/users/profile",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "5000",
							"path": [
								"api",
								"users",
								"profile"
							]
						},
						"description": "### Update User Profile\n\nThe `PUT` request is used to update the user's profile.\n\n#### Request Body\n\n- `email` (string, required): The email address of the user.\n    \n\n#### Response\n\nThe response is in JSON format and has the following schema:\n\n``` json\n{\n  \"_id\": \"\",\n  \"aadhar\": \"\",\n  \"role\": \"\",\n  \"email\": \"\",\n  \"twoFactorEnabled\": true,\n  \"isVerified\": true,\n  \"votingHistory\": [],\n  \"__v\": 0\n}\n\n ```"
					},
					"response": []
				},
				{
					"name": "voting-history",
					"protocolProfileBehavior": {
						"disableBodyPruning": true
					},
					"request": {
						"method": "GET",
						"header": [
							{
								"key": "Authorization",
								"value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTY1YThhY2U2YjkwNTI5MTdkOWM1ZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzIyMTg2Njc3LCJleHAiOjE3MjIxOTAyNzd9.uIVHiLzzyrtcuHkllb4pMyccxE9e14SwB8rr6OIEmQw",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:5000/api/users/voting-history",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "5000",
							"path": [
								"api",
								"users",
								"voting-history"
							]
						},
						"description": "The `GET` request retrieves the voting history of users from the specified endpoint.\n\n### Response\n\nThe response is a JSON array representing the voting history of users. The schema for the response is as follows:"
					},
					"response": []
				}
			]
		},
		{
			"name": "vote",
			"item": [
				{
					"name": "vote",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Authorization",
								"value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTY1YThhY2U2YjkwNTI5MTdkOWM1ZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzIyMTg2Njc3LCJleHAiOjE3MjIxOTAyNzd9.uIVHiLzzyrtcuHkllb4pMyccxE9e14SwB8rr6OIEmQw",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"candidateId\" : \"66a65b92ce6b9052917d9c6b\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:5000/api/votes",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "5000",
							"path": [
								"api",
								"votes"
							]
						},
						"description": "### Add Vote\n\nThis endpoint allows the user to add a vote for a candidate.\n\n#### Request Body\n\n- `candidateId` (string, required): The ID of the candidate for whom the vote is being added.\n    \n\n#### Response\n\n- Status: 400\n    \n- Content-Type: application/json\n    \n- `message` (string): A message indicating the reason for the bad request."
					},
					"response": []
				}
			],
			"description": "The vote management module oversees the voting process, ensuring that each user can vote securely and anonymously. It records each vote and associates it with the corresponding user and candidate, maintaining the integrity of the voting process. This module also prevents multiple votes by the same user and provides a transparent system for vote counting and auditing."
		},
		{
			"name": "feedback",
			"item": [
				{
					"name": "provide-feedback",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Authorization",
								"value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTY1YThhY2U2YjkwNTI5MTdkOWM1ZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzIyMTg2Njc3LCJleHAiOjE3MjIxOTAyNzd9.uIVHiLzzyrtcuHkllb4pMyccxE9e14SwB8rr6OIEmQw",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"feedback\" : \"Very good backend\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:5000/api/feedback",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "5000",
							"path": [
								"api",
								"feedback"
							]
						},
						"description": "\nThis endpoint allows the client to submit feedback via an HTTP POST request to http://localhost:5000/api/feedback.\n\n### Request Body\n- The request body should be in raw JSON format.\n  - `feedback` (string, required): The feedback message provided by the client.\n\n### Response\nThe response to the request will be in JSON format with the following schema:\n```json\n{\n    \"message\": \"\"\n}\n```\n- `message` (string): A message indicating the status of the feedback submission.\n\n"
					},
					"response": []
				},
				{
					"name": "read-feedback",
					"request": {
						"method": "GET",
						"header": [
							{
								"key": "Authorization",
								"value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTY1NTdhYjhjZGQyMDdkY2QzMTQ4ZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMjE4NzY4OCwiZXhwIjoxNzIyMTkxMjg4fQ.GcDIfNvxuqfcsdrlyLFdy94DW1Ren_w8C1GIjArtXos",
								"type": "text"
							}
						],
						"url": {
							"raw": "http://localhost:5000/api/feedback",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "5000",
							"path": [
								"api",
								"feedback"
							]
						},
						"description": "### GET /api/feedback\n\nThis endpoint retrieves a list of feedback items.\n\n#### Request\n\nThere are no request parameters for this endpoint.\n\n#### Response\n\nThe response will be in JSON format.\n\nThe HTTP status code for a successful response is 200."
					},
					"response": []
				}
			],
			"description": "The feedback and reporting module allows users to provide feedback on the voting process and report any issues they encounter. This module helps administrators gather insights from users, address concerns, and improve the overall user experience."
		},
		{
			"name": "notification",
			"item": [
				{
					"name": "create-notification",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Authorization",
								"value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTY1NTdhYjhjZGQyMDdkY2QzMTQ4ZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMjE4NzY4OCwiZXhwIjoxNzIyMTkxMjg4fQ.GcDIfNvxuqfcsdrlyLFdy94DW1Ren_w8C1GIjArtXos",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"message\" : \"Voting will start in 2 days\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:5000/api/notifications",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "5000",
							"path": [
								"api",
								"notifications"
							]
						},
						"description": "\nThis endpoint allows you to create notifications by sending an HTTP POST request to the specified URL. The request should include a JSON payload with a \"message\" key.\n\n### Request Body\n- `message` (string, required): The message content for the notification.\n\n### Response\nUpon successful execution, the endpoint returns a 200 status with a JSON response containing the \"message\" key, which holds the message content of the notification.\n\nExample:\n```json\n{\n    \"message\": \"Notification created successfully\"\n}\n```\n"
					},
					"response": []
				},
				{
					"name": "New Request",
					"request": {
						"method": "GET",
						"header": [
							{
								"key": "Authorization",
								"value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTY1NTdhYjhjZGQyMDdkY2QzMTQ4ZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMjE4NzY4OCwiZXhwIjoxNzIyMTkxMjg4fQ.GcDIfNvxuqfcsdrlyLFdy94DW1Ren_w8C1GIjArtXos",
								"type": "text"
							}
						],
						"url": {
							"raw": "http://localhost:5000/api/notifications",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "5000",
							"path": [
								"api",
								"notifications"
							]
						},
						"description": "### Get Notifications\n\nThis endpoint retrieves a list of notifications.\n\n#### Request\n\n- Method: GET\n    \n- URL: `http://localhost:5000/api/notifications`\n    \n\n#### Response\n\nThe response will be a JSON object."
					},
					"response": []
				}
			],
			"description": "The notification system module is designed to keep users informed about important updates and events. It sends real-time notifications to users about election dates, results, system updates, and other relevant information. This module ensures that users are always up-to-date with the latest developments, enhancing communication and engagement within the application."
		}
	]
}



