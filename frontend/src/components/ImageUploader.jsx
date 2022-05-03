import React, { useState, useRef } from 'react'
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { NFTStorage, File, Blob } from 'nft.storage'
// Import required actions and qualifiers.
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";
import {text} from "@cloudinary/url-gen/qualifiers/source";
import {Position} from "@cloudinary/url-gen/qualifiers/position";
import {TextStyle} from "@cloudinary/url-gen/qualifiers/textStyle";
import {compass} from "@cloudinary/url-gen/qualifiers/gravity";
import {source} from "@cloudinary/url-gen/actions/overlay";

// Cloudinary client
const cloud = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinaryUrl = "https://api.cloudinary.com/v1_1/" + cloud + "/image/upload";
const cld = new Cloudinary({
  cloud: {
    cloudName: cloud
  }
});

// NFT Storage client
const client = new NFTStorage({ token: process.env.IPFS_TOKEN });


export const ImageUploader = ({ trackerNumber, onSuccess, onError }) => {
  const fileInput = useRef(null);
  const [myImage, setMyImage] = useState();

  const handleFileInput = (e) => {
    const file = e.target.files[0];

    // 1 send the raw image to Cloudinary
    uploadToCloudinary(file)
      .then((response) => response.json())
      .then((data) => {
        // 1.1 receives the public_id of the raw file in Cloudinary
        const cloudinaryPublicId = data.public_id;
        console.log("Image uploaded to Cloudinary successfully (" + cloudinaryPublicId + ")");

        // 1.2 transform the image
        const transformedImage = cld.image(cloudinaryPublicId)
          .resize(thumbnail()
            .width(150)
            .height(150)
            .gravity(focusOn(FocusOn.face())))  // Crop the image, focusing on the face.
          .roundCorners(byRadius(20))    // Round the corners.
          .overlay(
            source(
              text(trackerNumber, new TextStyle('Cookie', 40)
                .fontWeight('bold'))
                .textColor('#f08')
            )
              .position(new Position().gravity(compass('center')))
          );
        setMyImage(transformedImage);

        // 1.2 Download the transformed image
        var transformedImageUrl = transformedImage.toURL();
        return downloadTransformedImage(transformedImageUrl);
      })
      // 2 Upload the transformed image to NFTStorage
      .then(async (res) => {
        const blob = await res.blob();
        return uploadToNFTStorage(blob);
      })
      .then((data) => {
        // 3 Show a preview of the transformed image
        console.log("Image uploaded to NFT.Storage successfully (" + data + ")");
        onSuccess(data);
      });
  }

  const downloadTransformedImage = (url) => {
    return fetch(url, {
      method: "GET"
    });
  }

  const uploadToCloudinary = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "fromBrandy");

    return fetch(cloudinaryUrl, {
      method: "POST",
      body: formData
    });
  }

  const uploadToNFTStorage = async (file) => {
    const blob = new Blob([await file.arrayBuffer()]);
    return client.storeBlob(blob);
  }



  return (
    <div>
      {myImage
        ?
        <div>
          <AdvancedImage cldImg={myImage} />
        </div>
        :
        <div className="file-uploader">
          <input ref={fileInput} type="file" onChange={handleFileInput} hidden />
          <button onClick={(e) => { e.preventDefault(); fileInput.current && fileInput.current.click() }} className="btn btn-primary">Chose file...</button>
        </div>
      }
    </div>
  )
}
