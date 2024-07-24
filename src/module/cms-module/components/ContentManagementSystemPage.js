/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
// import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// @mui
import { Card, Stack, Popover, MenuItem, Container, Typography, Box, Button, Grid, TextField } from '@mui/material';
// components
import ContentManagementToolbar from '../../../sections/@dashboard/contentmanagement/ContentManagementToolbar';
// import Label from '../components/label';
import Iconify from '../../../components/iconify';
// import Scrollbar from '../components/scrollbar';
// sections
// import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import MEMBERLIST from '../../../_mock/members';
import UserProfileModal from '../../memeberManagement-module/components/MemberProfileModal';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';
// import { EditorState } from 'draft-js';
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { getCMSAboutUsData, getCMSAboutUsUpdateData, getFaqData, postFaqData } from '../action/action';


const ContentManagementSystemPage = () => {
  const userId = localStorage.getItem('userId');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editorStateFaq, setEditorStateFaq] = useState(EditorState.createEmpty());
  const [cmsKey, setCmsKey] = useState('');
  const [cmsKeyFaq, setCmsKeyFaq] = useState('');
  const [cmsKeyError, setCmsKeyError] = useState('');
  const [editorError, setEditorError] = useState('');
  const [editorFaqError, setEditorFaqError] = useState('');
  const [selected, setSelected] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  //
  const dispatch = useDispatch();
  //
  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
    // Clear the editor error when the user starts typing
    setEditorError('');
  };


  const handleEditorChangeFaq = (editorState) => {
    setEditorStateFaq(editorState);
    // Clear the editor error when the user starts typing
    setEditorFaqError('');
  };


  const handleSubmit = () => {
    const editorContent = editorState.getCurrentContent().getPlainText();
    if (cmsKey.trim() === '') {
      setCmsKeyError('CMS Title is required');
    } else {
      setCmsKeyError('');
    }

    if (editorContent.trim() === '') {
      setEditorError('CMS Description is required');
    } else {
      setEditorError('');
    }

    if (cmsKey.trim() !== '' && editorContent.trim() !== '') {
      //
      dispatch(
        getCMSAboutUsUpdateData({
          reqData: {
            'cmsValue': editorContent
          },
          onSuccessData: (responseData) => {
            setIsUpdate(!isUpdate)
          },
          onErrorData: (error) => {
            setIsUpdate(!isUpdate)
          }
        })
      )
    }
  };

  const handleSubmitFaq = () => {
    const editorContent = editorStateFaq.getCurrentContent().getPlainText();


    if (editorContent.trim() === '') {
      setEditorFaqError('CMS Description is required');
    } else {
      setEditorFaqError('');
    }

    if (editorContent.trim() !== '') {
      //
      dispatch(
        postFaqData({
          reqData: {
            'userId': userId,
            'content': editorContent
          },
          onSuccessData: (responseData) => {
            setIsUpdate(!isUpdate)
          },
          onErrorData: (error) => {
            setIsUpdate(!isUpdate)
          }
        })
      )
    }
  };

  useEffect(() => {
    dispatch(
      getCMSAboutUsData({
        reqData: {},
        onSuccessData: (responseData) => {
          setCmsKey(responseData.data.cmsKey)
          setEditorState(EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(responseData.data.cmsValue)
            )
          ))
        },
        onErrorData: (error) => {

        }
      })
    )
    dispatch(
      getFaqData({
        reqData: {},
        onSuccessData: (responseData) => {
          // setCmsKey(responseData.data.cmsKey)
          const last = responseData.data[responseData.data.length - 1];
          setEditorStateFaq(EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(last.answer)
            )
          ))
        },
        onErrorData: (error) => {

        }
      })
    )
  }, [isUpdate])

  return (
    <>
      <Helmet>
        <title>Content Management System | SpeedQuiz</title>
      </Helmet>

      <Container>
        <Typography variant="h4" gutterBottom>
          Content Management System
        </Typography>
        <Card sx={{ paddingBottom: 5 }}>
          <ContentManagementToolbar numSelected={selected.length} title='About Us' />
          <Box sx={{ width: '80%', marginLeft: '10%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div style={{ border: '2px solid' }}>
                  <Editor
                    wrapperStyle={{ height: 350, width: '100%' }}
                    editorStyle={{ height: 270 }}
                    editorState={editorState}
                    onEditorStateChange={handleEditorChange}
                    placeholder="Type your content here..."
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <Button
                  xs={{ marginBottom: '20px' }}
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={!cmsKey || !editorState.getCurrentContent().hasText()}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Card>
        {/* <Card sx={{ marginTop: 5, paddingBottom: 5 }}>
          <ContentManagementToolbar numSelected={selected.length} title='FAQ' />
          <Box sx={{ width: '80%', marginLeft: '10%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div style={{ border: '2px solid' }}>
                  <Editor
                    wrapperStyle={{ height: 350, width: '100%' }}
                    editorStyle={{ height: 270 }}
                    editorState={editorStateFaq}
                    onEditorStateChange={handleEditorChangeFaq}
                    placeholder="Type your content here..."
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <Button
                  xs={{ marginBottom: '20px' }}
                  variant="contained"
                  color="primary"
                  onClick={handleSubmitFaq}
                  disabled={!editorState.getCurrentContent().hasText()}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Card> */}
      </Container>
    </>
  );
};

export default ContentManagementSystemPage;
