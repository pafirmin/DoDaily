export default function filterTasks(tasks, filters) {
  return filters.reduce((tasks, filter) => {
    if (filter === 'URGENT_ONLY') {
      return tasks.filter(task => task.priority === 'HIGH');
    } else if (filter === 'HIDE_DONE') {
      return tasks.filter(task => !task.complete);
    } else return tasks;
  }, tasks);
}
