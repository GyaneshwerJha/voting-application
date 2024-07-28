# Voting Application API

Our Voting Application is a robust and secure platform designed to facilitate fair and transparent elections. It offers a comprehensive suite of features that cater to the needs of voters, candidates, and administrators, ensuring a seamless and secure voting experience. The application is built with modern technologies, emphasizing data security, user privacy, and ease of use.

## Key Features

1. **User Authentication**
   - Secure sign-up and login with Aadhar card verification.
   - Two-Factor Authentication (2FA) for enhanced security.
   - Password management, including password change functionality.

2. **Candidate Management**
   - Admin functionality to create, update, and delete candidate profiles.
   - Display of detailed candidate information, including name, party affiliation, and manifesto.
   - Real-time vote count tracking for each candidate.

3. **Election Management**
   - Creation and management of election events, including start and end dates.
   - Activation and deactivation of elections to control voting periods.

4. **Voting System**
   - Secure and anonymous voting mechanism for eligible users.
   - Voter verification to ensure only registered users can vote.
   - Recording and storage of voting history for audit and transparency.

5. **Feedback and Reporting**
   - Users can provide feedback on the voting process and report issues.
   - Administrators can review and act on user feedback to improve the system.

6. **Notification System**
   - Real-time notifications to keep users informed about important updates, including election results and system alerts.

7. **Security and Privacy**
   - Use of JWT tokens for secure session management.
   - Data encryption and secure storage of sensitive information.
   - Compliance with privacy regulations and best practices to protect user data.

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB
- **Security**: bcrypt for password hashing, JWT for authentication, 2FA for additional security layers

## API Endpoints

### Authentication

#### Sign Up
- **Endpoint**: `POST /api/auth/signup`
- **Description**: Registers a new user with Aadhar, email, and password.
- **Request Body**:
    ```json
    {
        "aadhar": "123456789012",
        "password": "Password123!",
        "email": "user@example.com"
    }
    ```
- **Responses**:
    - `201 Created`: User registered successfully.
    - `500 Internal Server Error`: Failed User registration or User already exists.

#### Login
- **Endpoint**: `POST /api/auth/login`
- **Description**: Logs in a user with Aadhar and password. If 2FA is enabled and not verified, an OTP is sent to the user's email.
- **Request Body**:
    ```json
    {
        "aadhar": "123456789012",
        "password": "Password123!"
    }
    ```
- **Responses**:
    - `200 OK`: Login successful, returns JWT token or OTP sent.
    - `401 Unauthorized`: Invalid Aadhar or password.
    - `500 Internal Server Error`: Error in login.

#### Verify OTP
- **Endpoint**: `POST /api/auth/verifyOtp`
- **Description**: Verifies the OTP sent during the login process for users with 2FA enabled.
- **Request Body**:
    ```json
    {
        "aadhar": "123456789014",
        "otp": "526148"
    }
    ```
- **Responses**:
    - `200 OK`: OTP verified successfully, returns JWT token.
    - `400 Bad Request`: Invalid or expired OTP.
    - `500 Internal Server Error`: Error in OTP verification.

#### Change Password
- **Endpoint**: `POST /api/auth/change-password`
- **Description**: Allows a logged-in user to change their password by providing the current password and a new password.
- **Request Body**:
    ```json
    {
        "currentPassword": "CurrentPassword123!",
        "newPassword": "NewPassword456!"
    }
    ```
- **Responses**:
    - `200 OK`: Password changed successfully.
    - `401 Unauthorized`: Current password does not match.
    - `404 Not Found`: User not found.
    - `500 Internal Server Error`: Error in changing password.

### Candidate Management

#### Create Candidate
- **Endpoint**: `POST /api/candidates`
- **Description**: Creates a new candidate by providing the candidate's name, party, and manifesto.
- **Request Body**:
    ```json
    {
        "name": "David Kim",
        "party": "Innovation Party",
        "manifesto": "Pushing for technological advancement, innovation in public services, and modern infrastructure."
    }
    ```
- **Responses**:
    - `201 Created`: Candidate created successfully.

#### Get Candidates
- **Endpoint**: `GET /api/candidates`
- **Description**: Retrieves a list of candidates.
- **Response**:
    ```json
    [
        {
            "_id": "60d21b4667d0d8992e610c85",
            "name": "David Kim",
            "party": "Innovation Party",
            "manifesto": "Pushing for technological advancement, innovation in public services, and modern infrastructure.",
            "voteCount": 1200,
            "__v": 0
        }
    ]
    ```

#### Update Candidate
- **Endpoint**: `PUT /api/candidates/:id`
- **Description**: Updates the details of a specific candidate.
- **Request Body**:
    ```json
    {
        "name": "Evelyn Wong",
        "party": "Unity Party",
        "manifesto": "Building strong communities, promoting inclusivity, and ensuring equal opportunities for all."
    }
    ```
- **Responses**:
    - `200 OK`: Candidate details updated successfully.

#### Delete Candidate
- **Endpoint**: `DELETE /api/candidates/:id`
- **Description**: Deletes a specific candidate based on the provided candidate ID.
- **Responses**:
    - `200 OK`: Candidate deleted successfully.

### Election Management

#### Create Election
- **Endpoint**: `POST /api/elections/create`
- **Description**: Creates a new election.
- **Request Body**:
    ```json
    {
        "name": "General Election 2024",
        "startDate": "2024-08-01T00:00:00Z",
        "endDate": "2024-08-15T23:59:59Z",
        "isActive": true
    }
    ```
- **Responses**:
    - `201 Created`: Election created successfully.

#### Get Elections
- **Endpoint**: `GET /api/elections`
- **Description**: Retrieves a list of all elections.
- **Response**:
    ```json
    [
        {
            "_id": "60d21b4667d0d8992e610c87",
            "name": "General Election 2024",
            "startDate": "2024-08-01T00:00:00Z",
            "endDate": "2024-08-15T23:59:59Z",
            "isActive": true,
            "__v": 0
        }
    ]
    ```

#### Update Election
- **Endpoint**: `PUT /api/elections/:id`
- **Description**: Updates the details of a specific election.
- **Request Body**:
    ```json
    {
        "name": "Presidential Election 2024",
        "startDate": "2024-09-01T00:00:00Z",
        "endDate": "2024-09-15T23:59:59Z",
        "isActive": false
    }
    ```
- **Responses**:
    - `200 OK`: Election details updated successfully.

#### Delete Election
- **Endpoint**: `DELETE /api/elections/:id`
- **Description**: Deletes a specific election.
- **Responses**:
    - `200 OK`: Election deleted successfully.

### Voting

#### Cast Vote
- **Endpoint**: `POST /api/vote`
- **Description**: Allows a user to cast their vote for a specific candidate.
- **Request Body**:
    ```json
    {
        "candidateId": "60d21b4667d0d8992e610c85"
    }
    ```
- **Responses**:
    - `200 OK`: Vote cast successfully.
    - `400 Bad Request`: Invalid candidate ID or user not authorized.
    - `500 Internal Server Error`: Error in casting vote.

#### Get Vote Count
- **Endpoint**: `GET /api/vote/count/:candidateId`
- **Description**: Retrieves the current vote count for a specific candidate.
- **Response**:
    ```json
    {
        "candidateId": "60d21b4667d0d8992e610c85",
        "voteCount": 1200
    }
    ```

### Feedback

#### Submit Feedback
- **Endpoint**: `POST /api/feedback`
- **Description**: Allows users to submit feedback or report issues.
- **Request Body**:
    ```json
    {
        "userId": "60d21b4667d0d8992e610c84",
        "feedback": "The voting process was smooth, but I experienced a minor delay."
    }
    ```
- **Responses**:
    - `201 Created`: Feedback submitted successfully.
    - `400 Bad Request`: Invalid feedback format.

#### Get Feedback
- **Endpoint**: `GET /api/feedback`
- **Description**: Retrieves a list of all feedback submissions.
- **Response**:
    ```json
    [
        {
            "_id": "60d21b4667d0d8992e610c89",
            "userId": "60d21b4667d0d8992e610c84",
            "feedback": "The voting process was smooth, but I experienced a minor delay.",
            "__v": 0
        }
    ]
    ```

## Contributing

We welcome contributions to improve the application. Please fork the repository and submit a pull request with your changes. For any questions or issues, feel free to contact us at [support@example.com](mailto:support@example.com).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

