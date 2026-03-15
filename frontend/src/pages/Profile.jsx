import { useSelector } from 'react-redux';

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  return (
    <section className="max-w-xl rounded-xl bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <p className="mt-3"><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
    </section>
  );
}
