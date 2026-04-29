import { useState, useEffect } from 'react';
import { API_URL } from '../data';

export default function AdminView({ token }) {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '', ministry: '', category: '', benefit: '',
    eligibility: '', state: 'National', tag: '', portal: ''
  });

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/schemes`);
      const data = await res.json();
      setSchemes(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSchemes();
  }, []);

  const openModal = (scheme = null) => {
    if (scheme) {
      setEditingId(scheme._id);
      setFormData({
        title: scheme.title, ministry: scheme.ministry, category: scheme.category,
        benefit: scheme.benefit, eligibility: scheme.eligibility || '',
        state: scheme.state || 'National', tag: scheme.tag || '', portal: scheme.portal || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '', ministry: '', category: '', benefit: '',
        eligibility: '', state: 'National', tag: '', portal: ''
      });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_URL}/api/schemes/${editingId}` : `${API_URL}/api/schemes`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        closeModal();
        fetchSchemes();
      } else {
        const error = await res.json();
        alert('Error: ' + error.message);
      }
    } catch (err) {
      console.error(err);
      alert('Error saving scheme');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this scheme?')) return;
    try {
      const res = await fetch(`${API_URL}/api/schemes/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchSchemes();
      } else {
        alert('Failed to delete');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div style={{ padding: 40, color: '#a1a1aa' }}>Loading Admin Dashboard...</div>;

  return (
    <div style={{ padding: '30px 40px', maxWidth: 1000, margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: '#f59e0b', margin: 0, textTransform: 'uppercase', letterSpacing: 1 }}>Admin Dashboard</h2>
          <p style={{ color: '#a1a1aa', margin: '4px 0 0 0', fontSize: 13 }}>Manage portal resources and content</p>
        </div>
        <button onClick={() => openModal()}
          style={{ background: '#f59e0b', color: '#09090b', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          + Add Scheme
        </button>
      </div>

      <div style={{ background: '#18181b', borderRadius: 12, border: '1px solid #27272a', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#27272a', color: '#e4e4e7', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
              <th style={{ padding: '12px 20px', fontWeight: 600 }}>Title</th>
              <th style={{ padding: '12px 20px', fontWeight: 600 }}>Category</th>
              <th style={{ padding: '12px 20px', fontWeight: 600 }}>State</th>
              <th style={{ padding: '12px 20px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schemes.map(s => (
              <tr key={s._id} style={{ borderTop: '1px solid #27272a', color: '#a1a1aa', fontSize: 14 }}>
                <td style={{ padding: '16px 20px', color: '#e4e4e7', fontWeight: 500 }}>{s.title}</td>
                <td style={{ padding: '16px 20px' }}>{s.category}</td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ background: '#27272a', padding: '4px 8px', borderRadius: 4, fontSize: 11 }}>{s.state}</span>
                </td>
                <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                  <button onClick={() => openModal(s)} style={{ background: 'none', border: '1px solid #3f3f46', color: '#60a5fa', padding: '4px 10px', borderRadius: 6, cursor: 'pointer', marginRight: 8, fontSize: 12 }}>Edit</button>
                  <button onClick={() => handleDelete(s._id)} style={{ background: 'none', border: '1px solid #3f3f46', color: '#f87171', padding: '4px 10px', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}>Delete</button>
                </td>
              </tr>
            ))}
            {schemes.length === 0 && (
              <tr><td colSpan="4" style={{ padding: 40, textAlign: 'center', color: '#52525b' }}>No schemes found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(9,9,11,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: 12, padding: 30, width: 500, maxWidth: '90%', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: 18, color: '#f59e0b' }}>{editingId ? 'Edit Scheme' : 'Add New Scheme'}</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#a1a1aa', marginBottom: 6 }}>Title</label>
                <input required name="title" value={formData.title} onChange={handleChange} style={{ width: '100%', background: '#09090b', border: '1px solid #3f3f46', borderRadius: 6, padding: '10px 12px', color: '#e4e4e7', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: 12, color: '#a1a1aa', marginBottom: 6 }}>Ministry</label>
                  <input required name="ministry" value={formData.ministry} onChange={handleChange} style={{ width: '100%', background: '#09090b', border: '1px solid #3f3f46', borderRadius: 6, padding: '10px 12px', color: '#e4e4e7', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: 12, color: '#a1a1aa', marginBottom: 6 }}>Category</label>
                  <input required name="category" value={formData.category} onChange={handleChange} style={{ width: '100%', background: '#09090b', border: '1px solid #3f3f46', borderRadius: 6, padding: '10px 12px', color: '#e4e4e7', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: 12, color: '#a1a1aa', marginBottom: 6 }}>Benefit</label>
                  <input required name="benefit" value={formData.benefit} onChange={handleChange} style={{ width: '100%', background: '#09090b', border: '1px solid #3f3f46', borderRadius: 6, padding: '10px 12px', color: '#e4e4e7', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: 12, color: '#a1a1aa', marginBottom: 6 }}>State</label>
                  <input required name="state" value={formData.state} onChange={handleChange} style={{ width: '100%', background: '#09090b', border: '1px solid #3f3f46', borderRadius: 6, padding: '10px 12px', color: '#e4e4e7', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: 12, color: '#a1a1aa', marginBottom: 6 }}>Eligibility</label>
                  <input name="eligibility" value={formData.eligibility} onChange={handleChange} style={{ width: '100%', background: '#09090b', border: '1px solid #3f3f46', borderRadius: 6, padding: '10px 12px', color: '#e4e4e7', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: 12, color: '#a1a1aa', marginBottom: 6 }}>Tag</label>
                  <input name="tag" value={formData.tag} onChange={handleChange} style={{ width: '100%', background: '#09090b', border: '1px solid #3f3f46', borderRadius: 6, padding: '10px 12px', color: '#e4e4e7', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#a1a1aa', marginBottom: 6 }}>Portal URL</label>
                <input name="portal" value={formData.portal} onChange={handleChange} style={{ width: '100%', background: '#09090b', border: '1px solid #3f3f46', borderRadius: 6, padding: '10px 12px', color: '#e4e4e7', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 10 }}>
                <button type="button" onClick={closeModal} style={{ background: 'transparent', color: '#a1a1aa', border: 'none', cursor: 'pointer', padding: '10px 16px', fontSize: 13 }}>Cancel</button>
                <button type="submit" style={{ background: '#f59e0b', color: '#09090b', border: 'none', borderRadius: 6, padding: '10px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>Save Scheme</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
