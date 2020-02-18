import React, { useState, useEffect } from 'react';
import { Button } from 'shards-react';
import { Container, Image, Form } from 'semantic-ui-react';
import TextareaAutosize from 'react-textarea-autosize';

const FormComponent = ({
  defaultValue,
  edit,
  onSave,
  hasImage,
  type,
  children
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [privateDescription, setPrivateDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(
    hasImage ? 'https://place-hold.it/200x200' : null
  );

  useEffect(() => {
    if (defaultValue) {
      if (defaultValue.name) setName(defaultValue.name);
      if (defaultValue.description) setDescription(defaultValue.description);
      if (defaultValue.privateDescription)
        setPrivateDescription(defaultValue.privateDescription);
      if (defaultValue.imageUrl) setImageUrl(defaultValue.imageUrl);
    }
    // eslint-disable-next-line
  }, [defaultValue]);

  const onSubmit = e => {
    e.preventDefault();
    onSave({ name, description, privateDescription, imageUrl });
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center' }}>
      <Form
        className="mt-5"
        size="mini"
        style={{ width: 500 }}
        onSubmit={onSubmit}
      >
        <h3 className="text-center mb-3">
          {edit ? `Edit your ${type}` : `Create a new ${type}`}
        </h3>
        {type === 'tag' && (
          <p>Tags are applied to your cards to help you organize them!</p>
        )}
        {hasImage && (
          <React.Fragment>
            <Image
              src={imageUrl}
              centered
              circular
              style={{ maxHeight: 200, maxWidth: 200 }}
            />
            <Form.Input
              className="mt-3"
              fluid
              label="Image Url"
              placeholder="Your image url aka link ex-https://place-hold.it/200x200"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
            />
          </React.Fragment>
        )}
        <Form.Input
          fluid
          label="Name"
          placeholder={`Your ${type} name`}
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Form.Field label="Description" />
        <TextareaAutosize
          placeholder={`Your ${type} description`}
          value={description}
          onChange={e => setDescription(e.target.value)}
          minRows={3}
          maxRows={50}
          style={{ boxSizing: 'border-box' }}
        />
        {type !== 'campaign' && (
          <>
            <Form.Field label="Private Description" />
            <TextareaAutosize
              placeholder={`Your ${type} description only to be seen you and other admins`}
              value={privateDescription}
              onChange={e => setPrivateDescription(e.target.value)}
              minRows={3}
              maxRows={50}
              style={{ boxSizing: 'border-box' }}
            />
          </>
        )}
        {children}
        <Button className="my-4" block theme="success" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default FormComponent;
