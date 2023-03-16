const statusColor = (status) => {
  switch (status.toLowerCase()) {
  case 'pendente': return '#CCB800';
  case 'preparando': return '#66CC00';
  default: return '#00CC9B';
  }
};

const orderIdHandler = (id) => {
  const ORDERLESSTHAN10 = 10;
  if (id < ORDERLESSTHAN10) return `000${id}`;
  if (id >= ORDERLESSTHAN10 && id < 100) return `00${id}`;
  if (id >= 100) return id;
};

module.exports = {
  statusColor,
  orderIdHandler,
};
