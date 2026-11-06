
export const BlogMeta = ({ author, createdAt, category }) =>{
    return (
        <div className="text-muted mb-1">
            <small>
            By <strong>{author?.name}</strong>
            {" • "}
            {new Date(createdAt).toLocaleDateString()}
            {" • "}
            {category}            
            </small>
        </div>
    );
}