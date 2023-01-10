import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { setSignUp } from 'services/auth';
import { getGameCategory } from 'services/player';
import { CategoryTypes } from '../services/data-types';

export default function SignUpPhoto() {
  const [categories, setCategory] = useState([]);
  const [favorite, setFavorite] = useState('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [localForm, setLocalForm] = useState({});

  const getGameCategoryAPI = useCallback(async () => {
    const data = await getGameCategory();
    console.log('data :', data);
    setCategory(data);
    setFavorite(data[0]._id);
  }, [getGameCategory]);

  useEffect(() => {
    getGameCategoryAPI();
  }, []);

  useEffect(() => {}, []);

  const onSubmit = async () => {
    console.log('favorite', favorite);
    console.log('image: ', image);
    const localForm = await localStorage.getItem('user-form');
    const form = JSON.parse(localForm);

    const data = new FormData();
    data.append('image', image);
    data.append('email', form.email);
    data.append('name', form.name);
    data.append('password', form.password);
    data.append('username', form.username);
    data.append('phoneNumber', '3211312321');
    data.append('status', 'Y');
    data.append('favorite', favorite);
    const result = await setSignUp(data);
    console.log('result', result);
  };

  return (
    <section className="sign-up-photo mx-auto pt-lg-227 pb-lg-227 pt-130 pb-50">
      <div className="container mx-auto">
        <form action="">
          <div className="form-input d-md-block d-flex flex-column">
            <div>
              <div className="mb-20">
                <div className="image-upload text-center">
                  <label htmlFor="avatar">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="upload"
                        className="img-upload"
                      />
                    ) : (
                      <Image
                        src="/icon/upload.svg"
                        width={120}
                        height={120}
                        alt="upload"
                      />
                    )}
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={(event) => {
                      console.log(event.target.files);
                      const img = event.target.files[0];
                      setImagePreview(URL.createObjectURL(img));
                      return setImage(img);
                    }}
                  />
                </div>
              </div>
              <h2 className="fw-bold text-xl text-center color-palette-1 m-0">
                Shayna Anne
              </h2>
              <p className="text-lg text-center color-palette-1 m-0">
                shayna@anne.com
              </p>
              <div className="pt-50 pb-50">
                <label
                  htmlFor="category"
                  className="form-label text-lg fw-medium color-palette-1 mb-10"
                >
                  Favorite Game
                </label>
                <select
                  id="category"
                  name="category"
                  className="form-select d-block w-100 rounded-pill text-lg"
                  aria-label="Favorite Game"
                  value={favorite}
                  onChange={(event) => setFavorite(event.target.value)}
                >
                  {categories.map((category: CategoryTypes) => {
                    return (
                      <option key={category._id} value={category._id} selected>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="button-group d-flex flex-column mx-auto">
              <button
                type="button"
                className="btn btn-create fw-medium text-lg text-white rounded-pill mb-16"
                onClick={onSubmit}
              >
                Create My Account
              </button>

              <a
                className="btn btn-tnc text-lg color-palette-1 text-decoration-underline pt-15"
                href="/"
                role="button"
              >
                Terms & Conditions
              </a>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
