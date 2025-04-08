/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: User signup
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Signup successful
 *       400:
 *         description: Failed Validation
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Failed Validation
 *       401:
 *         description: Incorrect password
 *       404:
 *         description: Account not found
 *       500:
 *         description: Internal Server Error
 */


/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get the profile of the currently logged-in user.
 *     description: Retrieves the profile details of the authenticated user, including related entities like bookmarks, notes, and reminders.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the user profile.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /api/user/counselors:
 *   get:
 *     summary: Get all counselors.
 *     description: Gets all users with the role of counselor
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all counselors.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /api/user/change_pass:
 *   post:
 *     summary: Change user password
 *     description: Allows authenticated users to change their password by providing the old password and a new password.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: The current password of the user.
 *               newPassword:
 *                 type: string
 *                 description: The new password to be set.
 *     responses:
 *       200:
 *         description: Password changed successfully.
 *       401:
 *         description: Incorrect old password.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/user:
 *   patch:
 *     summary: Edit profile
 *     description: Allows authenticated users to edit their profiles
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: User's full name
 *               profileImg:
 *                 type: string
 *                 description: User's profile image
 *     responses:
 *       200:
 *         description: Successful
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/user/questionnaire:
 *   post:
 *     summary: Recommend a Support Group
 *     description: Calculates scores based on user responses and recommends the most relevant support group.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mood
 *               - emotions
 *               - energy
 *               - stress
 *               - interest
 *               - support
 *             properties:
 *               mood:
 *                 type: integer
 *                 description: User's current mood on a scale of 1-5 (1 = Very bad, 5 = Very good).
 *                 example: 2
 *               emotions:
 *                 type: array
 *                 description: List of emotions the user is feeling.
 *                 items:
 *                   type: string
 *                   enum: ["Hopeless", "Anxious", "Lonely"]
 *                 example: ["Hopeless", "Lonely"]
 *               energy:
 *                 type: integer
 *                 description: User's energy level on a scale of 1-5 (1 = Very low, 5 = Very high).
 *                 example: 3
 *               stress:
 *                 type: integer
 *                 description: User's stress level on a scale of 1-5 (1 = No stress, 5 = Extremely stressed).
 *                 example: 4
 *               interest:
 *                 type: integer
 *                 description: User's interest in daily activities on a scale of 1-5 (1 = No interest, 5 = Highly interested).
 *                 example: 2
 *               support:
 *                 type: string
 *                 description: How often the user receives emotional support.
 *                 enum: ["Never", "Sometimes", "Often", "Always"]
 *                 example: "Never"
 *     responses:
 *       200:
 *         description: Successfully returns the recommended support group.
 *       401:
 *         description: Unauthorized - User must be authenticated.
 *       500:
 *         description: Internal server error.
 */