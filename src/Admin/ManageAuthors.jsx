
import { useEffect, useState } from "react";
import { getAuthors,updateAuthor } from "../services/blogService";
import { FaEdit } from "react-icons/fa";

const ManageAuthors = () => {

    const [authors, setAuthors] = useState([]);

    const [showModal,setShowModal] = useState(false);
    const [editingAuthor,setEditingAuthor] = useState(null);
    
    const [search,setSearch] = useState("");

    const loadAuthors = async () =>
    {
        const res = await getAuthors();
        setAuthors(res.data);
    };

    const handleUpdateAuthor = async () => {

        await updateAuthor(editingAuthor.id,editingAuthor);

        setShowModal(false);

        loadAuthors();

    };

    useEffect(() =>
    {
        loadAuthors();
    }, []);

    const filteredAuthors = authors.filter(author =>
        author.name.toLowerCase().includes(search.toLowerCase())
    );

    const [currentPage,setCurrentPage] = useState(1);
    const authorsPerPage = 3;

    const totalPages = Math.ceil(filteredAuthors.length / authorsPerPage);

    const startIndex = (currentPage - 1) * authorsPerPage;
    const paginatedAuthors = filteredAuthors.slice(
            startIndex,
            startIndex + authorsPerPage
    );

  return (

    <div className="container px-5 py-4">

        <div className="row ">

            <h3 className="mb-4">Manage Authors</h3>

        </div>

        <div className="row d-flex-flex-row justify-content-center">
            <div className="col-4">
                <input
                className="form-control mb-3"
                placeholder="Search authors..."
                value={search}
                onChange={(e)=>{setSearch(e.target.value);setCurrentPage(1);}}
                />
            </div>
        </div>

        <div className="row">

            <table className="table table-striped">

                <thead>

                <tr>
                    <th>Name</th>
                    <th>Bio</th>
                    <th>Actions</th>
                </tr>

                </thead>

                <tbody>

                {paginatedAuthors.map(author => (

                    <tr key={author.id}>

                    <td>{author.name}</td>
                    <td>{author.bio}</td>

                    <td>

                        <button
                            className="btn btn-sm btn-warning"
                            onClick={()=>{
                                setEditingAuthor(author);
                                setShowModal(true);
                            }}
                        >
                            <FaEdit/>
                        </button>

                    </td>

                    </tr>

                ))}

                </tbody>

            </table>

            <div className="mt-3">
                    {Array.from({length: totalPages}, (_,i)=> (

                    <button
                        key={i}
                        className={`btn btn-sm me-2 ${
                        currentPage === i+1 ? "btn-primary" : "btn-outline-primary"
                        }`}
                        onClick={()=>setCurrentPage(i+1)}
                        >

                        {i+1}
                    </button>

                    ))}
            </div>            

            {showModal && (

            <div className="modal fade show d-block">

            <div className="modal-dialog">

            <div className="modal-content">

            <div className="modal-header">
            <h5>Edit Author</h5>
            <button
            className="btn-close"
            onClick={()=>setShowModal(false)}
            ></button>
            </div>

            <div className="modal-body">

            <input
            className="form-control mb-3"
            value={editingAuthor.name}
            onChange={(e)=>
            setEditingAuthor({...editingAuthor,name:e.target.value})
            }
            />

            <textarea
            className="form-control"
            value={editingAuthor.bio}
            onChange={(e)=>
            setEditingAuthor({...editingAuthor,bio:e.target.value})
            }
            />

            </div>

            <div className="modal-footer">

            <button
                className="btn btn-warning"
                onClick={handleUpdateAuthor}
                >
                Update Author
            </button>

            <button
                className="btn btn-secondary"
                onClick={()=>setShowModal(false)}
                >
                Cancel
            </button>

            </div>

            </div>

            </div>

            </div>

            )}

        </div>

    </div>

  );

};

export default ManageAuthors;