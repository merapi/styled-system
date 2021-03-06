import React from 'react'
import styled from '@emotion/styled'
import { flexDirection } from 'styled-system'
import { useAppContext } from './index'
import NavLink from './nav-link'
import { Box, css, block } from './system'
import Burger from './system/burger'
import Sidebar from './sidebar'
import Pagination from './pagination'
import EditLink from './edit-link'

const HeaderRoot = styled(Box)(css({
  width: '100%',
  height: 64,
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  zIndex: 2,
  bg: 'background',
  '@media screen and (max-width: 40em)': {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
  }
}), block('header'))
const HeaderSpacer = styled.div(css({
  display: 'none',
  '@media screen and (max-width: 40em)': {
    display: 'block',
    height: 64,
  }
}))

export const Header = ({
  sidebar = true,
  ...props
}) => {
  const state = useAppContext()
  return (
    <>
      <HeaderRoot>
        <NavLink href='/'
          css={{
            '&.active': {
              color: 'inherit'
            }
          }}>
          Styled System
        </NavLink>
        <Box mx='auto' />
        <button
          title='Toggle Color Mode'
          css={css({
            appearance: 'none',
            fontFamily: 'inherit',
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontWeight: 'bold',
            border: 'none',
            m: 3,
            p: 2,
            color: 'text',
            bg: 'gray',
            '&:focus': {
              outline: '2px solid',
            }
          })}
          onClick={e => {
            e.preventDefault()
            state.cycleMode()
          }}>
          {state.mode}
        </button>
        {sidebar && (
          <button
            title='Show Menu'
            css={css({
              appearances: 'none',
              border: 0,
              mr: 3,
              p: 2,
              color: 'inherit',
              backgroundColor: 'transparent',
              '&:focus': {
                outline: '2px solid',
              },
              '@media screen and (min-width: 40em)': {
                display: 'none',
              }
            })}
            onClick={state.toggleOpen}>
            <Burger />
          </button>
        )}
      </HeaderRoot>
      <HeaderSpacer />
    </>
  )
}

const Root = styled(Box)(css({
  display: 'flex',
  flexDirection: 'column',
}), block('root'))

const Main = styled(Box)({
  display: 'flex',
}, flexDirection, block('main'))

const Overlay = props =>
  <Box
    {...props}
    css={{
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }}
  />

export const Container = styled(Box)(
  css({
    width: '100%',
    maxWidth: 1024,
    lineHeight: 'body',
    mx: 'auto',
    p: 4,
  }),
  block('main')
)
Container.defaultProps = {
  as: 'main',
}

export default ({
  banner,
  ...props
}) => {
  const state = useAppContext()

  return (
    <Root>
      <Header />
      {state.open && <Overlay onClick={e => state.setOpen(false)} />}
      <Box>
        {banner}
      </Box>
      <Main flexDirection={[ 'column', 'row' ]}>
        <Sidebar
          open={state.open}
          onClick={e => state.setOpen(false)}
          width={[ 1, 256, 320 ]}
        />
        <Container
          css={{
            maxWidth: 896,
          }}>
          {props.children}
          <EditLink />
          <Pagination />
        </Container>
      </Main>
    </Root>
  )
}
