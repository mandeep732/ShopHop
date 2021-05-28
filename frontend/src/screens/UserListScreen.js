import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Title from '../components/Title'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserList, deleteUserById } from '../actions/userActions'
import DateFormat from '../components/DateFormat'

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch()
  const userList = useSelector((state) => state.userList)
  const { loading, error, users, redirect } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const {
    loading: loadingUserDelete,
    error: errorUserDelete,
    success: successUserDelete,
  } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUserList())
    } else history.push('/login')
  }, [dispatch, history, successUserDelete, userInfo])

  const deleteHandler = (id, userName, isAdmin) => {
    if (isAdmin) window.confirm("Can't delete admin user")
    else if (
      window.confirm(`Are you sure you want to delete user : ${userName}`)
    ) {
      dispatch(deleteUserById(id))
    }
  }
  return (
    <>
      <Title text="Manage Users" />
      <h1>Manage Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : errorUserDelete ? (
        <Message variant="danger">{errorUserDelete}</Message>
      ) : (
        <Table bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Created On</th>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <DateFormat utc={user.createdAt} type="date-time-sameline" />
                </td>
                <td>{user._id}</td>
                <td>{user.name}</td>

                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: 'green' }} />
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit" />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() =>
                      deleteHandler(user._id, user.name, user.isAdmin)
                    }
                  >
                    <i className="fas fa-trash" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
