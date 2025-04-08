/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Create an appointment for the currently logged-in user.
 *     description: Creates an appointment by selecting a time slot for the user. The time slot must be available.
 *     tags: [Appointment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               timeSlotId:
 *                 type: integer
 *                 description: The ID of the time slot for the appointment.
 *             required:
 *               - timeSlotId
 *     responses:
 *       201:
 *         description: Appointment successfully created.
 *       400:
 *         description: The time slot is already booked.
 *       404:
 *         description: The time slot could not be found.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /api/appointments/{id}:
 *   delete:
 *     summary: Cancel an existing appointment.
 *     description: Cancels an appointment and makes the associated time slot available again.
 *     tags: [Appointment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the appointment to cancel.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Appointment successfully canceled and time slot made available.
 *       404:
 *         description: Appointment not found.
 *       500:
 *         description: Internal Server Error.
 */