import dates from 'date-fns';

const { differenceInCalendarDays, isWeekend, addDays } = dates;

const taskList = [
  {
    id: 1,
    dueDate: new Date(2021, 2, 21),
    hours: 15,
  },
  {
    id: 2,
    dueDate: new Date(2021, 1, 25),
    days: 6,
  },

  {
    id: 3,
    dueDate: new Date(2021, 2, 1),
    hours: 2,
  },
  {
    id: 4,
    dueDate: new Date(2021, 2, 1),
    days: 3,
  },
  {
    id: 5,
    dueDate: new Date(2021, 2, 21),
    days: 12,
  },
];

const schedulerm = (tasks, hoursPerDay) => {
  console.log(totalDaysToComplete());

  if (validateViability()) {
    let data = formatData();
    let schedule = createSchedule(data);

    console.log(schedule);
    return;
  } else {
    console.log('Nope');
  }

  function validateViability() {
    const latestDeadline = tasks.reduce((dueDate, task) =>
      dueDate > task.dueDate ? dueDate : task.dueDate
    );
    const interval = differenceInCalendarDays(latestDeadline, new Date());
    console.log(interval);
    if (totalDaysToComplete() > interval) {
      console.log('Impossible!');
      return false;
    }
    return true;
  }

  function totalDaysToComplete() {
    return tasks.reduce(
      (accum, task) => (accum += taskDurationInDays(task)),
      0
    );
  }

  function taskDurationInDays(task) {
    if (task.hours) {
      return task.hours / hoursPerDay;
    } else if (task.days) {
      return task.days;
    }
  }

  function createSchedule(data) {
    let schedule = [];
    let dayTracker = 0;
    for (let i = 0; i < data.length; i++) {
      data[i].startDay = Math.floor(dayTracker);

      if (data[i].startDay > data[i].latestStartDate) {
        throw 'Nope';
      }
      schedule.push(data[i]);
      dayTracker += data[i].daysToComplete;
    }

    return schedule;
  }

  function formatData() {
    return tasks
      .map(task => {
        let daysToComplete = taskDurationInDays(task);
        let dueIn = differenceInCalendarDays(task.dueDate, new Date());
        let latestStartDate = dueIn - daysToComplete;

        return {
          task: task,
          latestStartDate,
          dueIn,
          daysToComplete,
        };
      })
      .sort((a, b) => a.latestStartDate - b.latestStartDate);
  }
};

class Scheduler {
  constructor(tasks, hoursPerDay, permitWeekends) {
    this.tasks = tasks;
    this.hoursPerDay = hoursPerDay;
    this.permitWeekends = permitWeekends;
    this.today = new Date();
  }

  validateViability() {
    const interval = differenceInCalendarDays(
      this.latestDeadline(),
      new Date()
    );

    if (this.totalDaysToComplete() > interval) {
      return false;
    }
    return true;
  }

  latestDeadline() {
    return this.tasks.reduce((dueDate, task) =>
      dueDate > task.dueDate ? dueDate : task.dueDate
    );
  }

  totalDaysToComplete() {
    return this.tasks.reduce(
      (accum, task) => (accum += this.taskDurationInDays(task)),
      0
    );
  }

  taskDurationInDays(task) {
    if (task.hours) {
      return task.hours / this.hoursPerDay;
    } else if (task.days) {
      return task.days;
    }
  }

  createSchedule() {
    if (!this.validateViability()) {
      return 'Impossible!';
    }
    let data = this.formatData();
    let schedule = [];
    let dayTracker = 0;

    for (let i = 0; i < data.length; i++) {
      let startDay = Math.floor(dayTracker);

      if (startDay > data[i].latestStartDate) {
        throw 'Nope';
      }

      data[i].startDate = startDay;

      schedule.push(data[i]);
      dayTracker += data[i].daysToComplete;
    }
    return schedule;
  }

  formatData() {
    return this.tasks
      .map(task => {
        let daysToComplete = this.taskDurationInDays(task);
        let dueIn = differenceInCalendarDays(task.dueDate, new Date());
        let latestStartDate = dueIn - daysToComplete;

        return {
          task: task,
          latestStartDate,
          dueIn,
          daysToComplete,
        };
      })
      .sort((a, b) => a.latestStartDate - b.latestStartDate);
  }
}

const schedule = new Scheduler(taskList, 7, false);

console.log(schedule.createSchedule());
