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
            "_id": "",
            "name": "",
            "party": "",
            "manifesto": "",
            "voteCount": 0,
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
        "name": "Election Name",
        "startDate": "2024-08-01T00:00:00Z",
        "endDate": "2024-08-15T23:59:59Z",
        "isActive": true
    }
    ```
- **Responses**:
    - `200 OK`: Election created successfully.
