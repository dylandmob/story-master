import React, { useState, useEffect } from 'react';
import { Button } from 'shards-react';
import { Container, Image, Form } from 'semantic-ui-react';

const FormComponent = ({
  defaultValue,
  title,
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
        <h3 className="text-center mb-3">{title}</h3>
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
        <Form.TextArea
          label="Description"
          placeholder={`Your ${type} description`}
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ minHeight: 60 }}
        />
        <Form.TextArea
          label="Private Description"
          placeholder={`Your ${type} description only to be seen by you and other admins`}
          value={privateDescription}
          onChange={e => setPrivateDescription(e.target.value)}
          style={{ minHeight: 60 }}
        />
        {type === 'card' && <React.Fragment>{children}</React.Fragment>}
        <Button className="my-4" block theme="success" type="submit">
          Create
        </Button>
      </Form>
    </Container>
  );
};

export default FormComponent;
