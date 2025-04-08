/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a new note.
 *     description: Allows the authenticated user to create a note for a specific devotion.
 *     tags:
 *       - Notes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               note:
 *                 type: string
 *                 description: The content of the note.
 *     responses:
 *       201:
 *         description: Successfully created the note.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Get notes for a specific user.
 *     description: Retrieves all notes created by the authenticated user.
 *     tags:
 *       - Notes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the notes.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /api/notes/{id}:
 *   patch:
 *     summary: Update a note for a specific user.
 *     description: Allows the authenticated user to update an existing note.
 *     tags:
 *       - Notes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The note id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               note:
 *                 type: string
 *                 description: The updated content of the note.
 *     responses:
 *       200:
 *         description: Successfully updated the note.
 *       404:
 *         description: Note not found.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Delete a note for a user.
 *     description: Allows the authenticated user to delete an existing note.
 *     tags:
 *       - Notes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The note id
 *     responses:
 *       204:
 *         description: Successfully deleted the note.
 *       404:
 *         description: Note not found.
 *       500:
 *         description: Internal Server Error.
 */