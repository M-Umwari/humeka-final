/**
 * @swagger
 * /api/timeSlots/activedates/{id}:
 *   get:
 *     summary: Get active dates
 *     description: Retrieve all active dates with available time slots for the logged-in user.
 *     tags: [TimeSlots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The counselor id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved active dates.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /api/timeSlots/activedates/{id}/{date}:
 *   get:
 *     summary: Get time slots by date
 *     description: Retrieve available time slots for the specified date.
 *     tags: [TimeSlots]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The counselor ID.
 *         schema:
 *           type: string
 *       - in: path
 *         name: date
 *         required: true
 *         description: The date for which time slots are requested.
 *         schema:
 *           type: string
 *           format: date
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved time slots for the specified date.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /api/timeSlots/:
 *   post:
 *     summary: Create a new time slot
 *     description: Create a time slot for the counselor (the logged-in user) for a specific date and time range.
 *     tags: [TimeSlots]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date for the time slot.
 *               from:
 *                 type: string
 *                 format: time
 *                 description: The starting time of the time slot.
 *               to:
 *                 type: string
 *                 format: time
 *                 description: The ending time of the time slot.
 *     responses:
 *       200:
 *         description: Successfully created the time slot.
 *       409:
 *         description: Time slot overlaps with an existing one.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /api/timeSlots/counselor/{id}:
 *   get:
 *     summary: Get all time slots
 *     description: Retrieve all time slots by counselor.
 *     tags: [TimeSlots]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the counselor.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all time slots.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /api/timeSlots/{id}:
 *   patch:
 *     summary: Update a time slot
 *     description: Update the details of an existing time slot for the logged-in counselor.
 *     tags: [TimeSlots]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the time slot to be updated.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               from:
 *                 type: string
 *                 format: time
 *                 description: The updated starting time of the time slot.
 *               to:
 *                 type: string
 *                 format: time
 *                 description: The updated ending time of the time slot.
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The updated date for the time slot.
 *     responses:
 *       200:
 *         description: Successfully updated the time slot.
 *       404:
 *         description: Time slot not found.
 *       500:
 *         description: Internal Server Error.
 *   delete:
 *     summary: Delete a time slot
 *     description: Delete a time slot for the logged-in counselor.
 *     tags: [TimeSlots]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the time slot to be deleted.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully deleted the time slot.
 *       404:
 *         description: Time slot not found.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /api/timeSlots/default:
 *   post:
 *     summary: Create a default time slot
 *     description: Create a default time slot for the logged-in counselor.
 *     tags: [TimeSlots]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               from:
 *                 type: string
 *                 format: time
 *                 description: The starting time of the default time slot.
 *               to:
 *                 type: string
 *                 format: time
 *                 description: The ending time of the default time slot.
 *     responses:
 *       200:
 *         description: Successfully created the default time slot.
 *       409:
 *         description: Time slot overlaps with an existing one.
 *       500:
 *         description: Internal Server Error.
 *   get:
 *     summary: Get all default time slots
 *     description: Retrieve all default time slots for the logged-in counselor.
 *     tags: [TimeSlots]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all default time slots.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /api/timeSlots/default/{id}:
 *   patch:
 *     summary: Update a default time slot
 *     description: Update the details of an existing default time slot for the logged-in counselor.
 *     tags: [TimeSlots]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the default time slot to be updated.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               from:
 *                 type: string
 *                 format: time
 *                 description: The updated starting time of the default time slot.
 *               to:
 *                 type: string
 *                 format: time
 *                 description: The updated ending time of the default time slot.
 *     responses:
 *       200:
 *         description: Successfully updated the default time slot.
 *       404:
 *         description: Default time slot not found.
 *       500:
 *         description: Internal Server Error.
 *   delete:
 *     summary: Delete a default time slot
 *     description: Delete a default time slot for the logged-in counselor.
 *     tags: [TimeSlots]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the default time slot to be deleted.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully deleted the default time slot.
 *       404:
 *         description: Default time slot not found.
 *       500:
 *         description: Internal Server Error.
 */