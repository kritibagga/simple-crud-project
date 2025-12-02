import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/users";

function App() {
	const [users, setUsers] = useState([]);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		role: "",
	});



	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const [isEditingId, setEditingId] = useState(null);

	const resetForm = () => {
		setFormData({
			name: "",
			email: "",
			role: "",
		});
		setEditingId(null);
	};

	const fetchUsers = async () => {
		try {
			const res = await axios.get(API_BASE_URL);
			setUsers(res.data);
		} catch (err) {
			console.error("Error fetching users", err);
		}
	};

  useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		fetchUsers();
	}, []);

	const handleEdit=(user)=>{
		setEditingId(user.id);
		setFormData({
			name:user.name,
			email:user.email,
			role:user.role,
		})

	}
	const handleDelete=async(id)=>{
		if(!window.confirm("Are you sure you want to delete this record")) return;

		try{
			await axios.delete(`${API_BASE_URL}/${id}`);
			await fetchUsers();
		}catch (err){
			console.error("Error deleting user", err)
		}



	}

	const handleSubmit=async(e)=>{
		e.preventDefault();

		try{
			if(isEditingId===null){
				await axios.post(API_BASE_URL, formData)
			}else{
				await axios.put(`${API_BASE_URL}/${isEditingId}`, formData)
			}

			await fetchUsers();
			resetForm();
		}catch(err){
			console.error("Error saving user", err)
		}
	}

	return (
		<div className='container my-5'>
			<h1 className='mb-4 text-center'> Simple User Management</h1>
			<div className='card mb-4'>
				<div className='card-header'>
					{isEditingId ? "Edit User" : "Add new user"}
				</div>
				<div className='card-body'>
					<form  onSubmit={handleSubmit} className='row g-3'>
						<div className='col-md-4'>
							<label className='form-label'>Name </label>
							<input
								name='name'
								value={formData.name}
								onChange={handleChange}
								className='form-control'
								required
							/>
						</div>

						<div className='col-md-4'>
							<label className='form-label'>Email </label>
							<input
								name='email'
								type='email'
								value={formData.email}
								onChange={handleChange}
								className='form-control'
								required
							/>
						</div>

						<div className='col-md-4'>
							<label className='form-label'>Role </label>
							<input
								name='role'
								value={formData.role}
								onChange={handleChange}
								className='form-control'
								required
							/>
						</div>

						<div className='col-12 d-flex gap-2'>
							<button
								type='submit'
								className='btn btn-primary'>
								{isEditingId ? "Update" : "Add"}
							</button>

							{isEditingId && (
								<button
									type='button'
									className='btn btn-secondary'
									onClick={resetForm}>
									Cancel
								</button>
							)}
						</div>
					</form>
				</div>
			</div>

      <div className="card">
        <div className="card-header">
          Users List
        </div>
		<div className="card-body table-body">
			{users.length===0?(<p>No Users yet. Add one above.</p>):(
				<div className="table-responsive">
					<table className="table table-striped table-bordered table-hover">
						<thead className="table-light">
							<tr>
								<th>Id</th>
								<th>Name</th>
								<th>Email</th>
								<th>Role</th>
								<th style={{width:"150px"}}>Actions</th>

							</tr>

						</thead>
						<tbody>
							{
								users.map((u)=>(
									<tr key={u.id}>
										<td>{u.id}</td>
										<td>{u.name}</td>
										<td>{u.email}</td>
										<td>{u.role}</td>
										<td>
											<button className="btn btn-sm btn-outline-primary me-2" onClick={()=>handleEdit(u)}>Edit</button>

											<button className="btn btn-sm btn-outline-danger me-2" onClick={()=>handleDelete(u.id)}>Delete</button>
										</td>

									</tr>

								))


							}
						</tbody>

					</table>

				</div>

			)}
		</div>

      </div>
		</div>
	);
}

export default App;
