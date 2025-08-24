import { useEffect, useState } from 'react';
import api from '../../lib/api';
import Card from '../../components/Card';

export default function Menu() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/menu').then(({ data }) => setItems(data));
  }, []);

  const daysOrder = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const sorted = [...items].sort((a,b) => daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day));

  return (
    <Card title="Weekly Mess Menu">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2">Day</th>
              <th className="text-left p-2">Breakfast</th>
              <th className="text-left p-2">Lunch</th>
              <th className="text-left p-2">Dinner</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => (
              <tr key={row._id} className="border-b">
                <td className="p-2 font-medium">{row.day}</td>
                <td className="p-2">{row.breakfast}</td>
                <td className="p-2">{row.lunch}</td>
                <td className="p-2">{row.dinner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

