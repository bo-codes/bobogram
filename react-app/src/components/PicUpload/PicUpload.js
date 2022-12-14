import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import { connect } from "react-redux";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "react-image-crop/lib/ReactCrop.scss";

class PicUploadNoCrop extends Component {
  constructor() {
    super();
    this.state = {
      src: null,
      crop: {
        unit: "%",
        width: 30,
        aspect: 1 / 1,
      },
      croppedImageUrl: null,
    };
  }

  handleFile = (e) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ src: fileReader.result });
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };


  // ----------- THE SUBMITTAL ----------- //
  handleSubmit = (e) => {
    e.preventDefault();
    const user = this.props.currentUser;
    const formData = new FormData();

    formData.append("user[id]", user.id);
    formData.append("post[post.image_url]", this.state.croppedImage);

    addPhotoToUser(user, formData);
  };

  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropChange = (crop) => {
    this.setState({ crop });
  };

  onCropComplete = (crop) => {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = this.getCroppedImg(this.imageRef, crop);
      this.setState({ croppedImageUrl });
    }
  };

  dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    let croppedImage = new File([u8arr], filename, { type: mime });
    this.setState({ croppedImage: croppedImage });
  }

  getCroppedImg(image, crop) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const reader = new FileReader();
    canvas.toBlob((blob) => {
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        this.dataURLtoFile(reader.result, "cropped.jpg");
      };
    });
  }

  render() {
    const { crop, profile_pic, src } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <label htmlFor="profile_pic"></label>
        <input
          type="file"
          id="profile_pic"
          value={profile_pic}
          onChange={this.handleFile}
        />
        {src && (
          <ReactCrop
            src={src}
            crop={crop}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}
        <button>save</button>
      </Form>
    );
  }
}

const mapSTP = (state) => {
  return { currentUser: state.currentUser };
};

export default connect(mapSTP)(PicUploadNoCrop);
