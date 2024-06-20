export const getAvailableTimeSlots = (
  scheduledTimes: { startTime: string; endTime: string }[]
) => {
  const totalSlots = [
    { startTime: "08:00", endTime: "10:00" },
    { startTime: "10:00", endTime: "12:00" },
    { startTime: "12:00", endTime: "14:00" },
    { startTime: "14:00", endTime: "16:00" },
    { startTime: "16:00", endTime: "18:00" },
  ];

  const availableSlots = totalSlots.filter((slot) => {
    let isAvailable = true;

    for (const schedule of scheduledTimes) {
      const existingStartTime = new Date(`1999-01-01T${schedule.startTime}`);
      const existingEndTime = new Date(`1999-01-01T${schedule.endTime}`);
      const slotStartTime = new Date(`1999-01-01T${slot.startTime}`);
      const slotEndTime = new Date(`1999-01-01T${slot.endTime}`);

      if (
        (slotStartTime < existingEndTime &&
          slotStartTime >= existingStartTime) ||
        (slotEndTime > existingStartTime && slotEndTime <= existingEndTime) ||
        (slotStartTime <= existingStartTime && slotEndTime >= existingEndTime)
      ) {
        return (isAvailable = false);
      }
    }

    return isAvailable;
  });

  return availableSlots;
};
