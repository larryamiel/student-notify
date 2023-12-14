import { db } from '@/firebase/firebase';
import { addDoc, collection, deleteDoc, doc, getCountFromServer, getDocs, limit, or, query, updateDoc, where } from 'firebase/firestore';

export default function useSchedule() {
  const addSchedule = async (schedule) => {
    try {
      // merge from and to with its time
      const from = new Date(schedule.from);
      const fromTime = schedule['from-time'].split(':');
      from.setHours(fromTime[0]);
      from.setMinutes(fromTime[1]);

      const to = new Date(schedule.to);
      const toTime = schedule['to-time'].split(':');
      to.setHours(toTime[0]);
      to.setMinutes(toTime[1]);

      delete schedule['from-time'];
      delete schedule['to-time'];

      await addDoc(collection(db, "schedules"), { ...schedule, from, to });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log('Auth Error:', errorCode, errorMessage);
    }
  };

  const updateSchedule = async (scheduleId, schedule) => {
    try {
      // merge from and to with its time
      const from = new Date(schedule.from);
      const fromTime = schedule['from-time'].split(':');
      from.setHours(fromTime[0]);
      from.setMinutes(fromTime[1]);

      const to = new Date(schedule.to);
      const toTime = schedule['to-time'].split(':');
      to.setHours(toTime[0]);
      to.setMinutes(toTime[1]);

      delete schedule['from-time'];
      delete schedule['to-time'];
      
      await updateDoc(doc(db, "schedules", scheduleId), { ...schedule, from, to });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSchedule = async (scheduleId) => {
    try {
      await deleteDoc(doc(db, "schedules", scheduleId));
    } catch (error) {
      console.log(error);
    }
  }

  const getSchedules = async (department = null, month = null, year = null) => {
    try {
      const filters = [];

      if (department) {
        filters.push(where('department', '==', department));
      }

      if (month && year) {
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 0);

        filters.push(
          where('from', '>=', start),
          where('from', '<=', end)
        );
      }

      const q = query(collection(db, "schedules"), ...filters);

      const querySnapshot = await getDocs(q);
      const schedules = [];

      querySnapshot.forEach((doc) => {
        schedules.push({
          id: doc.id,
          ...doc.data()
        });
      });

      return schedules;
    } catch (error) {
      console.log(error);
    }
  };

  const getUpcomingSchedulesCount = async (department = null) => {
    try {
      const today = new Date();
      const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());

      const extraFilters = [];

      if (department) {
        extraFilters.push(where('department', '==', department));
      }

      const q = query(collection(db, "schedules"), where('from', '>=', start), ...extraFilters);

      const snapshot = await getCountFromServer(q);
      return snapshot.data().count;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    addSchedule,
    updateSchedule,
    deleteSchedule,
    getSchedules,
    getUpcomingSchedulesCount
  }
}
