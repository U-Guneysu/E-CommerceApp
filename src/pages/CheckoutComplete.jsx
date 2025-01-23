import { Link } from 'react-router-dom';

const CheckoutComplete = () => {
    return (
        <div className="container my-5 text-center" style={{ maxWidth: '600px', margin: 'auto' }}>
            <div className="card p-4 shadow-lg" style={{ backgroundColor: '#f7f7f7', borderRadius: '15px' }}>
                <div className="card-body">
                    <h1 className="text-success mb-3">
                        <i className="fas fa-check-circle"></i> Ödeme Tamamlandı!
                    </h1>
                    <p className="lead text-muted mb-4">Sepetiniz başarıyla onaylandı. Teşekkür ederiz!</p>
                    <div className="mb-4">
                        <img
                            src="https://img.icons8.com/ios/452/checked-checkbox.png"
                            alt="Success"
                            style={{ width: '100px', height: '100px' }}
                        />
                    </div>
                    <Link to="/" className="btn btn-primary btn-lg mt-3" style={{ borderRadius: '50px' }}>
                        Anasayfaya Dön
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CheckoutComplete;
