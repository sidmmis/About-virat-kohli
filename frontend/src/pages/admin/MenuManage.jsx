import { useEffect, useState } from 'react';
import api from '../../lib/api';
import Card from '../../components/Card';

export default function MenuManage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ day: 'Monday', breakfast: '', lunch: '', dinner: '' });

  const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const load = () => api.get('/menu').then(({ data }) => setItems(data));

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/menu', form);
    setForm({ day: 'Monday', breakfast: '', lunch: '', dinner: '' });
    load();
  };

  const remove = async (day) => {
    await api.delete(`/menu/${encodeURIComponent(day)}`);
    load();
  };

  const byDay = Object.fromEntries(items.map((i) => [i.day, i]));

  return (
    <div className="space-y-6">
      <Card title="Upsert Day Menu">
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <select value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })} className="border rounded-md px-3 py-2">
            {days.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <input value={form.breakfast} onChange={(e) => setForm({ ...form, breakfast: e.target.value })} placeholder="Breakfast" className="border rounded-md px-3 py-2" required />
          <input value={form.lunch} onChange={(e) => setForm({ ...form, lunch: e.target.value })} placeholder="Lunch" className="border rounded-md px-3 py-2" required />
          <input value={form.dinner} onChange={(e) => setForm({ ...form, dinner: e.target.value })} placeholder="Dinner" className="border rounded-md px-3 py-2" required />
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-3 py-2">Save</button>
        </form>
      </Card>

      <Card title="Current Weekly Menu">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2">Day</th>
                <th className="text-left p-2">Breakfast</th>
                <th className="text-left p-2">Lunch</th>
                <th className="text-left p-2">Dinner</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {days.map((d) => (
                <tr key={d} className="border-b">
                  <td className="p-2 font-medium">{d}</td>
                  <td className="p-2">{byDay[d]?.breakfast || '-'}</td>
                  <td className="p-2">{byDay[d]?.lunch || '-'}</td>
                  <td className="p-2">{byDay[d]?.dinner || '-'}</td>
                  <td className="p-2">
                    {byDay[d] && <button onClick={() => remove(d)} className="text-red-600 hover:underline text-sm">Delete</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

