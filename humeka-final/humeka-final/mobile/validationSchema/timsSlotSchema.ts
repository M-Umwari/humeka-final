import * as Yup from 'yup';

export const defaultTimeSlotSchema = Yup.object({
  from: Yup.date()
    .nullable()
    .required('Start time is required'),
  to: Yup.date()
    .nullable()
    .required('End time is required')
    .test('is-greater', 'End time must be greater than start time', function(value) {
      const { from } = this.parent;
      if (from && value) {
        return value > from;
      }
      return true;
    })
    .test('is-same-day', 'End time must be on the same day as start time', function(value) {
      const { from } = this.parent;
      if (from && value) {
        const startDate = new Date(from);
        const endDate = new Date(value);
        return startDate.toDateString() === endDate.toDateString(); 
      }
      return true;
    }),
});

export const timeSlotSchema = Yup.object({
  date: Yup.date()
    .nullable()
    .required('Date is required'),
  from: Yup.date()
    .nullable()
    .required('Start time is required')
    .test('is-same-day-as-date', 'Start time must be on the selected date', function(value) {
      const { date } = this.parent;
      if (date && value) {
        const selectedDate = new Date(date);
        const startTime = new Date(value);
        
        return selectedDate.getFullYear() === startTime.getFullYear() &&
               selectedDate.getMonth() === startTime.getMonth() &&
               selectedDate.getDate() === startTime.getDate();
      }
      return true;
    }),
  to: Yup.date()
    .nullable()
    .required('End time is required')
    .test('is-greater', 'End time must be greater than start time', function(value) {
      const { from } = this.parent;
      if (from && value) {
        return value > from;
      }
      return true;
    })
    .test('is-same-day', 'End time must be on the same day as start time', function(value) {
      const { from } = this.parent;
      if (from && value) {
        const startDate = new Date(from);
        const endDate = new Date(value);
        return startDate.toDateString() === endDate.toDateString(); 
      }
      return true;
    })
    .test('is-same-day-as-date', 'End time must be on the selected date', function(value) {
      const { date } = this.parent;
      if (date && value) {
        const selectedDate = new Date(date);
        const endTime = new Date(value);
        
        return selectedDate.getFullYear() === endTime.getFullYear() &&
               selectedDate.getMonth() === endTime.getMonth() &&
               selectedDate.getDate() === endTime.getDate();
      }
      return true;
    }),
});