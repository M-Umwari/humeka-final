/**
 * @swagger
 * /api/groups:
 *   post:
 *     summary: Create a new group.
 *     description: Creates a new group with the given name.
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the group.
 *     responses:
 *       201:
 *         description: Group created successfully.
 *       400:
 *         description: Validation error or group already exists.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: Retrieves all groups.
 *     description: Retrieves all groups.
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Groups retrieved successfully.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /api/groups/join:
 *   post:
 *     summary: Join a group.
 *     description: Allows a user to join an existing group.
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupId:
 *                 type: string
 *                 description: The ID of the group to join.
 *     responses:
 *       200:
 *         description: User joined the group successfully.
 *       400:
 *         description: User is already in the group.
 *       404:
 *         description: Group not found.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /api/groups/leave:
 *   post:
 *     summary: Leave a group.
 *     description: Allows a user to leave a group they are part of.
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupId:
 *                 type: string
 *                 description: The ID of the group to leave.
 *     responses:
 *       200:
 *         description: User left the group successfully.
 *       404:
 *         description: Group not found.
 *       500:
 *         description: Internal Server Error.
 */